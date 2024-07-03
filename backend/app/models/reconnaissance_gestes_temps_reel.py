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
        pass

    def configurer_mediapipe(self):
        pass