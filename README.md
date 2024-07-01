# HandPi Games

## Description

HandPi Games est une collection innovante de jeux utilisant la reconnaissance des gestes de la main par IA, développée spécifiquement pour le hackathon "Open Project IoT". Ce projet répond parfaitement aux critères du hackathon en combinant l'IoT, l'IA et l'apprentissage interactif.

## Conformité aux Objectifs du Hackathon

✅ **Objet Connecté Fonctionnel** : Utilisation du Raspberry Pi 4 avec module caméra.

✅ **Application Web de Contrôle** : Interface utilisateur web pour interagir avec le jeu.

✅ **Développement Full-Stack** : Intégration de front-end et back-end.

✅ **Architecture Asynchrone** : Système permettant un pilotage flexible de l'objet connecté.

✅ **Innovation et Créativité** : Utilisation de l'IA pour la reconnaissance des gestes.

✅ **Impact Social** : Facilite l'apprentissage de la langue des signes.

## Fonctionnalités Principales

### Jeu d'Apprentissage de la Langue des Signes :
- Affichage de lettres à l'écran.
- Reconnaissance des signes effectués par le joueur via la caméra.
- Progression à travers l'alphabet.

### Mises à Jour Futures :
- **Stage 2:** Reconnaissance de mots complets en langue des signes.
- **Pierre-Papier-Ciseaux:** Jeu multijoueur à distance.

## Technologies Utilisées

### Matériel:
- Raspberry Pi 4
- Module Caméra

### Logiciel:
- Python
- OpenCV
- TensorFlow/Keras
- Flask
- HTML/CSS/JavaScript

## Structure du Projet

- `backend/`: Code backend et API.
- `frontend/`: Interface utilisateur web.
- `model/`: Scripts et modèles de reconnaissance des gestes.

## Architecture

Notre projet utilise une architecture asynchrone conforme aux exigences du hackathon :
- Client web (Frontend UI)
- Service API (Backend Flask)
- Client IoT (Raspberry Pi avec caméra)

Un système de file d'attente au niveau du service API gère l'absence de connexion temporaire, assurant une robustesse conforme aux attentes du hackathon.

## Schéma d'Interaction des Composants et Technologies

                 +-------------------------+
                 |      Interface UI       |
                 | (HTML/CSS/JavaScript)   |
                 +-----------+-------------+
                             |
                             v
                 +-----------+-------------+
                 |     Flask (Backend)     |
                 |    (Framework Python)   |
                 +-----------+-------------+
                             |
                             v
          +------------------+------------------+
          |                                    |
          v                                    v
+---------+----------+             +-----------+---------+
|  OpenCV (Python)   |             | Logique du Jeu      |
| Capturer et Traiter|             | (Python)            |
| les Gestes de la Main|           | Determine Winner    |
+--------------------+             +-----------+---------+
                                             |
                                             v
                                  +----------+--------------+
                                  | Raspberry Pi 4 (Serveur)|
                                  +-------------------------+
                                  | Module Caméra (Entrée)  |
                                  +-------------------------+


                                  
