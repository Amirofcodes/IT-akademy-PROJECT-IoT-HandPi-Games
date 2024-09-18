from flask import Blueprint, jsonify, Response, request
import cv2
import numpy as np
import base64
from app.models.user import get_reconnaissance_gestes

bp = Blueprint('general', __name__)

@bp.route('/video_feed', methods=['GET'])
def video_feed():
    # Get the frames from the camera feed and send them as a streaming response
    return Response(get_reconnaissance_gestes().gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@bp.route('/check_gesture', methods=['POST'])
def check_gesture():
    image_data = request.json.get('gesture')
    nparr = np.frombuffer(base64.b64decode(image_data.split(',')[1]), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    reconnaissance_gestes = get_reconnaissance_gestes()
    result = reconnaissance_gestes.traiter_frame(img)
    return jsonify(result)

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to HandPi Games API'})
