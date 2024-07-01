# HandPi Games

## Description

HandPi Games est une collection de jeux utilisant la reconnaissance des gestes de la main par IA. Notre premier jeu se concentre sur l'apprentissage de la langue des signes, où les joueurs voient des lettres à l'écran et doivent les signer correctement avec leurs mains. Les futures mises à jour incluront des jeux supplémentaires tels qu'un jeu de Pierre-Papier-Ciseaux à distance.

Ce projet a pour but d'utiliser les nouvelles technologies disponibles ainsi que l'IA pour aider les gens à communiquer.

## Fonctionnalités Principales

- **Jeu d'Apprentissage de la Langue des Signes :**
  - Les joueurs voient une lettre à l'écran.
  - Les joueurs doivent signer la lettre affichée avec leurs mains devant la caméra.
  - Si le signe est correct, le jeu passe à la lettre suivante.
  - Le jeu continue jusqu'à ce que le joueur complète l'alphabet.

- **Mises à Jour Futures :**
  - **Stage 2:** Signer des mots au lieu de lettres individuelles.
  - **Pierre-Papier-Ciseaux:** Jouer contre l'ordinateur ou un autre joueur à distance.

## Technologies Utilisées

- **Matériel:**
  - Raspberry Pi 4
  - Module Caméra
- **Logiciel:**
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
