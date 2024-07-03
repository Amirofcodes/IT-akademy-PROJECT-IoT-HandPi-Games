import warnings
import pickle
import cv2
import mediapipe as mp
import numpy as np

warnings.filterwarnings("ignore", category=UserWarning, module="google.protobuf.symbol_database")

class ReconnaissanceGestesTempsReel:
    def __init__(self, chemin_modele: str, labels_dict: dict):
        self.charger_modele(chemin_modele)
        self.labels_dict = labels_dict
        self.configurer_mediapipe()

    def charger_modele(self, chemin_modele: str):
        with open(chemin_modele, 'rb') as f:
            model_dict = pickle.load(f)
        self.model = model_dict['model']

    def configurer_mediapipe(self):
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles
        self.hands = self.mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

    def traiter_frame(self, frame):
        data_aux = []
        x_ = []
        y_ = []

        if frame is None:
            print("Frame is None")
            return None

        frame = cv2.flip(frame, 1)
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

        return frame