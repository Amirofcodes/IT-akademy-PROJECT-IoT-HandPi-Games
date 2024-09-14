# HandPi Games

## Description

HandPi Games is an innovative collection of games using AI-powered hand gesture recognition, developed for the "Open Project IoT" hackathon. This project seamlessly integrates IoT, AI, and interactive learning.

## Project Status

We are excited to announce that we have successfully implemented a testing version of our first game: the ABCD Game!

### ABCD Game (Testing Version)

- **Functionality**: The game connects the frontend to the backend using our API.
- **Gameplay**: Players are prompted to show hand gestures representing letters A, B, C, and D.
- **Recognition**: Our AI model recognizes the gestures in real-time.
- **Scoring**: Players progress through the alphabet, with the game ending upon successful completion.
- **Replay**: After completion, players can start a new game.

Check out our video demonstration:

https://github.com/Amirofcodes/IT-akademy-PROJECT-IoT-HandPi-Games/assets/138374972/3bc904e3-70e6-4180-85f1-fb9a176dd3f4

## Conformity to Hackathon Objectives

✅ **Functional Connected Object**: Utilizes Raspberry Pi 4 with a camera module.
✅ **Web Control Application**: Interactive user interface for game interaction.
✅ **Full-Stack Development**: Integrates frontend and backend components.
✅ **Asynchronous Architecture**: Enables flexible control of the connected object.
✅ **Innovation and Creativity**: Employs AI for gesture recognition.
✅ **Social Impact**: Facilitates learning of the alphabet and sign language basics.

## Main Features

### Alphabet Learning Game:

- Displays letters on screen.
- Recognizes player's hand gestures via camera.
- Progresses through the alphabet (currently A to D).

### Future Updates:

- **Stage 2:** Recognition of complete words in sign language.
- **Rock-Paper-Scissors:** Multiplayer game with remote gameplay.

## Technologies Used

### Hardware:

- Raspberry Pi 4
- Camera Module

### Software:

- Python
- OpenCV
- TensorFlow/Keras
- Flask
- HTML/CSS/JavaScript
- React

## Project Structure

- `backend/`: Backend code and API.
- `frontend/`: Web user interface.
- `model/`: Gesture recognition scripts and models.

## Architecture

Our project uses an asynchronous architecture as required by the hackathon:

- Web client (Frontend UI)
- API Service (Flask Backend)
- IoT Client (Raspberry Pi with camera)

A queue system in the API service manages temporary connection absence, ensuring robustness as per hackathon expectations.

## Component and Technology Interaction Diagram

<img width="687" alt="Component Interaction Diagram" src="https://github.com/Amirofcodes/IT-akademy-PROJECT-IoT-HandPi-Games/assets/138374972/0fba9d09-dae9-4f77-8f67-30b72260c096">

## Getting Started

(Add instructions for setting up and running the project locally)

## Contributing

We welcome contributions to the HandPi Games project! Please read our contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the "Open Project IoT" hackathon organizers for the inspiration.
- Shoutout to all team members and contributors.
