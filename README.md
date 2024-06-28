# IT-akademy-PROJECT-IoT-HandPi-Games

# handPi Games

## Description
handPi Games est un jeu de Pierre-Papier-Ciseaux à distance avec reconnaissance des gestes de la main par IA. Ce projet utilise un Raspberry Pi 4 et une caméra pour capturer et reconnaître les gestes des joueurs, et un serveur Flask pour gérer la logique du jeu et l'interface utilisateur.

## Fonctionnalités Principales
1. **Menu Principal**:
   - Sélection de modes de jeu simples:
     - Mode Classique: Jouer contre l'ordinateur.
     - Mode Contre un Ami: Jouer contre un autre joueur localement.

2. **Reconnaissance des Gestes**:
   - Utilisation de la caméra pour capturer les gestes de la main (pierre, papier, ciseaux).
   - Affichage des résultats du geste détecté.

3. **Logiciel de Jeu**:
   - Implémentation de la logique de base pour déterminer le gagnant (pierre > ciseaux, papier > pierre, ciseaux > papier).
   - Gestion des égalités lorsque les deux joueurs jouent la même main.

## Technologies Utilisées
- Raspberry Pi 4
- Python
- OpenCV
- TensorFlow/Keras
- Flask
- HTML/CSS/JavaScript

## Structure du Projet
- `backend/`: Contient le code backend et les API.
- `frontend/`: Contient le code frontend et l'interface utilisateur.
- `model/`: Contient les scripts et modèles de reconnaissance des gestes.

## Schéma d'Interaction des Composants et Technologies

```plaintext
                 +-------------------------+
                 |      Frontend UI        |
                 | (HTML/CSS/JavaScript)   |
                 +-----------+-------------+
                             |
                             v
                 +-----------+-------------+
                 |     Flask (Backend)     |
                 |    (Python Framework)   |
                 +-----------+-------------+
                             |
                             v
          +------------------+------------------+
          |                                    |
          v                                    v
+---------+----------+             +-----------+---------+
|  OpenCV (Python)   |             |  Game Logic (Python)|
| Capture and Process|             | Determine Winner    |
| Hand Gestures      |             |                    |
+--------------------+             +-----------+---------+
                                             |
                                             v
                                  +----------+----------+
                                  | Raspberry Pi 4 (Server)|
                                  +-----------------------+
                                  | Camera Module (Input)  |
                                  +-----------------------+
