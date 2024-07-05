from .reconnaissance_gestes_temps_reel import ReconnaissanceGestesTempsReel
import os

# Obtenir le chemin absolu du répertoire du fichier actuel
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construire le chemin vers model.p
model_path = os.path.join(current_dir, 'model.p')

# Initialiser la reconnaissance de gestes
reconnaissance_gestes = ReconnaissanceGestesTempsReel(model_path, {'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D'})

def get_reconnaissance_gestes():
    return reconnaissance_gestes