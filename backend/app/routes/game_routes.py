from flask import Blueprint, jsonify, request
from app.services.game_service import game_service
from app.models.user import get_reconnaissance_gestes
import numpy as np

bp = Blueprint('game', __name__, url_prefix='/api/game')

@bp.route('/start', methods=['POST'])
def start_game():
    result = game_service.start_game()
    return jsonify(result)

@bp.route('/end', methods=['POST'])
def end_game():
    result = game_service.end_game()
    return jsonify(result)

@bp.route('/check', methods=['GET'])
def check_gesture():
    reconnaissance_gestes = get_reconnaissance_gestes()
    frame = reconnaissance_gestes.get_latest_frame()
    if frame is None:
        print("Error: No frame available")
        return jsonify({'message': 'No frame available'}), 400

    try:
        result = reconnaissance_gestes.traiter_frame(frame)
        
        if isinstance(result, dict):
            predicted_gesture = result.get('predicted_character', 'Unknown')
        else:
            print(f"Unexpected result type: {type(result)}")
            return jsonify({'message': 'Unexpected result type'}), 500
        
        game_result = game_service.check_gesture(predicted_gesture)
        return jsonify({**game_result, 'predicted_gesture': predicted_gesture})
    except Exception as e:
        print(f"Error processing frame: {str(e)}")
        return jsonify({'message': 'Error processing frame'}), 500
