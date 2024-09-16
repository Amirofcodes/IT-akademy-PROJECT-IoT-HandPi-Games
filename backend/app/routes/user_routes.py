from flask import Blueprint, jsonify

bp = Blueprint('user', __name__, url_prefix='/api/user')

@bp.route('/profile', methods=['GET'])
def get_profile():
    # Implement user profile retrieval logic here
    return jsonify({'message': 'User profile'})