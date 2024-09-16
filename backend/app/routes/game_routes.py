from flask import Blueprint, jsonify, request
from app.services.game_service import game_service

bp = Blueprint('game', __name__, url_prefix='/api/game')

@bp.route('/start', methods=['POST'])
def start_game():
    result = game_service.start_game()
    return jsonify(result)

@bp.route('/end', methods=['POST'])
def end_game():
    result = game_service.end_game()
    return jsonify(result)

@bp.route('/check', methods=['POST'])
def check_gesture():
    gesture = request.json.get('gesture')
    if gesture is None:
        return jsonify({'message': 'No gesture provided'}), 400
    result = game_service.check_gesture(gesture)
    return jsonify(result)

