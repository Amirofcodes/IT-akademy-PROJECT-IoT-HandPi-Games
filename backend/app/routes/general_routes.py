from flask import Blueprint, jsonify, Response, request
import cv2
import numpy as np
import base64
from app.models.user import get_reconnaissance_gestes

bp = Blueprint('general', __name__)

@bp.route('/video_feed', methods=['GET'])
def video_feed():
    return Response(get_reconnaissance_gestes().gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@bp.route('/check_gesture', methods=['POST'])
def check_gesture():
    # Get the image data from the request
    image_data = request.json.get('gesture')
    
    # Convert the base64 image to a numpy array
    nparr = np.frombuffer(base64.b64decode(image_data.split(',')[1]), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Process the image with your AI model
    reconnaissance_gestes = get_reconnaissance_gestes()
    result = reconnaissance_gestes.traiter_frame(img)
    
    # Return the result
    return jsonify(result)

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to HandPi Games API'})