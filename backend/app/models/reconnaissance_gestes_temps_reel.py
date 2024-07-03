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