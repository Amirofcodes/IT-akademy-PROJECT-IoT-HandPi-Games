# app/routes/game_routes.py

from flask import Blueprint, jsonify, Response
from app.services.game_service import game_service
from app.models.user import get_reconnaissance_gestes
import logging

bp = Blueprint('game', __name__, url_prefix='/api/game')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@bp.route('/start', methods=['POST'])
def start_game():
    result = game_service.start_game()
    logger.info(f"Game started: {result}")
    return jsonify(result)

@bp.route('/check', methods=['GET'])
def check_gesture():
    reconnaissance_gestes = get_reconnaissance_gestes()
    
    if not reconnaissance_gestes.running:
        reconnaissance_gestes.start_capture()

    try:
        frame = reconnaissance_gestes.get_latest_frame()
        if frame is None:
            logger.error("Error: No frame available")
            return jsonify({'message': 'Error: No frame available. Please check camera connection.'}), 400
        
        result = reconnaissance_gestes.traiter_frame(frame)
        if isinstance(result, dict):
            predicted_gesture = result.get('predicted_character', 'Unknown')
            logger.info(f"Predicted gesture: {predicted_gesture}")
        else:
            logger.error(f"Unexpected result type: {type(result)}")
            return jsonify({'message': 'Error: Unexpected result type'}), 500
        
        game_result = game_service.check_gesture(predicted_gesture)
        logger.info(f"Game result: {game_result}")
        return jsonify({**game_result, 'predicted_gesture': predicted_gesture})
    except Exception as e:
        logger.error(f"Error processing gesture: {str(e)}")
        return jsonify({'message': f'Error processing gesture: {str(e)}'}), 500

@bp.route('/end', methods=['POST'])
def end_game():
    result = game_service.end_game()
    logger.info(f"Game ended: {result}")
    return jsonify(result)

@bp.route('/video_feed')
def video_feed():
    reconnaissance_gestes = get_reconnaissance_gestes()
    if not reconnaissance_gestes.running:
        reconnaissance_gestes.start_capture()
    return Response(reconnaissance_gestes.gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
