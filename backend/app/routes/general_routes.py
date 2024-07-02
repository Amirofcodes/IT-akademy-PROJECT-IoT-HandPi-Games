from flask import Blueprint, jsonify

bp = Blueprint('general', __name__)

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to HandPi Games API'})
