import warnings
import pickle
import cv2
import mediapipe as mp
import numpy as np
import threading
import time
import logging

warnings.filterwarnings("ignore", category=UserWarning, module="google.protobuf.symbol_database")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ReconnaissanceGestesTempsReel:
    def __init__(self, chemin_modele: str, labels_dict: dict):
        self.charger_modele(chemin_modele)
        self.labels_dict = labels_dict
        self.configurer_mediapipe()
        self.cap = None
        self.latest_frame = None
        self.lock = threading.Lock()
        self.running = False
        self.capture_thread = None

    def charger_modele(self, chemin_modele: str):
        with open(chemin_modele, 'rb') as f:
            model_dict = pickle.load(f)
        self.model = model_dict['model']

    def configurer_mediapipe(self):
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles
        self.hands = self.mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5, min_tracking_confidence=0.5)

    def start_capture(self):
        if self.running:
            return
        
        self.cap = cv2.VideoCapture(0)
        if not self.cap.isOpened():
            logger.error("Failed to open camera")
            return

        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        self.cap.set(cv2.CAP_PROP_FPS, 15)

        self.running = True
        self.capture_thread = threading.Thread(target=self._capture_frames)
        self.capture_thread.start()
        logger.info("Camera capture started")

    def _capture_frames(self):
        while self.running:
            ret, frame = self.cap.read()
            if ret:
                with self.lock:
                    self.latest_frame = frame
            else:
                logger.warning("Failed to capture frame")
            time.sleep(1/30)

    def get_latest_frame(self):
        with self.lock:
            return self.latest_frame.copy() if self.latest_frame is not None else None

    def traiter_frame(self, frame):
        data_aux = []
        x_ = []
        y_ = []
        predicted_character = 'Unknown'

        if frame is None:
            print("Frame is None")
            return {'predicted_character': predicted_character, 'frame': None}

        frame = cv2.flip(frame, 1)
        frame = cv2.resize(frame, (320, 240))  # Reduce size for faster processing
        H, W, _ = frame.shape
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = self.hands.process(frame_rgb)
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                self.mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    self.mp_hands.HAND_CONNECTIONS,
                    self.mp_drawing_styles.get_default_hand_landmarks_style(),
                    self.mp_drawing_styles.get_default_hand_connections_style())

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y
                    x_.append(x)
                    y_.append(y)

                for i in range(0, 21):
                    data_aux.append(x_[i] - min(x_))
                    data_aux.append(y_[i] - min(y_))

            if len(data_aux) == 42:
                prediction = self.model.predict([np.asarray(data_aux)])
                predicted_character = self.labels_dict.get(str(prediction[0]), 'Unknown')

                x1, y1 = int(min(x_) * W) - 10, int(min(y_) * H) - 10
                x2, y2 = int(max(x_) * W) - 10, int(max(y_) * H) - 10
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
                cv2.putText(frame, predicted_character, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3, cv2.LINE_AA)
            else:
                print(f"Nombre de caractéristiques inattendu : {len(data_aux)}")

        return {'predicted_character': predicted_character, 'frame': frame}

    def gen_frames(self):
        if not self.running:
            self.start_capture()

        while True:
            frame = self.get_latest_frame()
            if frame is not None:
                result = self.traiter_frame(frame)
                processed_frame = result['frame']
                ret, buffer = cv2.imencode('.jpg', processed_frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                logger.warning("No frame available for streaming")
                time.sleep(0.1)

    def stop_capture(self):
        self.running = False
        if self.capture_thread and self.capture_thread.is_alive():
            self.capture_thread.join()
        if self.cap and self.cap.isOpened():
            self.cap.release()
        logger.info("Camera capture stopped")

    def __del__(self):
        self.stop_capture()
