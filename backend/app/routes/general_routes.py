from flask import Blueprint, jsonify, Response
import cv2
from ..models.user import get_reconnaissance_gestes

bp = Blueprint('general', __name__)

@bp.route('/video_training', methods=['GET'])
def video_training():
    reconnaissance_gestes = get_reconnaissance_gestes()
    return Response(reconnaissance_gestes.gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to HandPi Games API'})

def gen_frames():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open default camera")
    else:
        print("Default camera opened successfully")

    frame_count = 0
    while True:
        success, frame = cap.read()
        if not success:
            print("Error: Failed to capture frame")
            break
        else:
            print(f"Frame {frame_count} captured")
            frame_count += 1
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                print("Error: Failed to encode frame")
                break
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n--frame\r\n')

@bp.route('/video_feed', methods=['GET'])
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
