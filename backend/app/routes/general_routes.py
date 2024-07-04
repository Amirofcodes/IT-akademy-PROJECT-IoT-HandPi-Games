from flask import Blueprint, jsonify, Response, request
import cv2

bp = Blueprint('general', __name__)

def get_reconnaissance_gestes():
    class ReconnaissanceGestes:
        def gen_frames(self):
            cap = cv2.VideoCapture(0)
            if not cap.isOpened():
                print("Error: Could not open default camera")
                return
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

    return ReconnaissanceGestes()

def recognize_gesture(gesture_image):
    # Implement the gesture recognition logic here
    # For example, compare the gesture image with a set of known gestures
    # and return the result.
    return {'message': 'Gesture recognized', 'new_letter': 'A', 'score': 1}

@bp.route('/video_training', methods=['POST'])
def video_training():
    if request.is_json:
        gesture_image = request.json.get('gesture')
        result = recognize_gesture(gesture_image)  # Process the gesture image
        return jsonify(result)
    else:
        return jsonify({'error': 'Invalid Content-Type. Expected application/json'}), 415

@bp.route('/video_feed', methods=['GET'])
def video_feed():
    return Response(get_reconnaissance_gestes().gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@bp.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to HandPi Games API'})
