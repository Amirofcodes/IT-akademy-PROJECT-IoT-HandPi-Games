# HandPi Games

An innovative AI-powered hand gesture recognition game developed for the "Open Project IoT" hackathon.

![ABCD Game Screenshot](Docs/ABCD_GAME_IMG.png)

## Project Overview

HandPi Games integrates IoT, AI, and interactive learning through a Raspberry Pi-based system that recognizes hand gestures to play educational games.

### Current Status: ABCD Game (Test Version)

- Players show hand gestures for letters A, B, C, and D
- Real-time AI recognition of gestures
- Score tracking and game completion logic

## Tech Stack

- **Hardware**: Raspberry Pi 4, Camera Module
- **Backend**: Python, Flask, OpenCV, TensorFlow/Keras
- **Frontend**: React, HTML/CSS/JavaScript

## Project Flow

The following sequence diagram illustrates the flow of the ABCD game, from start to finish:

```mermaid
sequenceDiagram
    actor Player
    participant Frontend
    participant Backend
    participant GameService
    participant ReconnaissanceGestes
    participant OpenCV
    participant AIModel

    Player->>Frontend: Clicks "Start Game"
    Frontend->>Backend: POST /api/game/start
    Backend->>GameService: start_game()
    GameService-->>Backend: {message: "Game started", current_letter: "A"}
    Backend-->>Frontend: Game started response
    Frontend->>Player: Display "Show letter A"

    Frontend->>Backend: GET /video_feed
    loop Video Stream
        Backend->>OpenCV: Capture frame
        OpenCV-->>Backend: Frame captured
        Backend-->>Frontend: Stream video frame
        Frontend->>Player: Display video frame
    end

    loop For each letter (A to D)
        Frontend->>Backend: GET /api/game/check (every 1 second)
        Backend->>OpenCV: Capture frame
        OpenCV-->>Backend: Frame captured
        Backend->>ReconnaissanceGestes: traiter_frame(frame)
        ReconnaissanceGestes->>OpenCV: Process frame
        ReconnaissanceGestes->>AIModel: Predict gesture
        AIModel-->>ReconnaissanceGestes: Predicted gesture
        ReconnaissanceGestes-->>Backend: {predicted_character, frame}
        Backend->>GameService: check_gesture(predicted_gesture)

        alt Correct gesture
            GameService-->>Backend: {message: "Correct!", new_letter, score}
            Backend-->>Frontend: Correct gesture response
            Frontend->>Player: Display "Correct! Show next letter"
        else Incorrect gesture
            GameService-->>Backend: {message: "Incorrect, try again"}
            Backend-->>Frontend: Incorrect gesture response
            Frontend->>Player: Display "Incorrect, try again"
        end
    end

    Backend->>GameService: check_gesture("D")
    GameService-->>Backend: {message: "Game ended", final_score}
    Backend-->>Frontend: Game completed response
    Frontend->>Player: Display "Congratulations! Game completed"
    Frontend->>Player: Show "Play Again" button
```

This diagram shows the interaction between the player, frontend, backend, and various components during a game session.

## Quick Start Guide

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```
   python run.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

### Playing the Test Game

1. Ensure both backend and frontend servers are running.
2. Open a web browser and go to `http://localhost:5173/`.
3. Click "Start Game" and follow on-screen instructions to show hand gestures for letters A, B, C, and D.
4. The game will recognize your gestures and progress through the alphabet.

## Project Structure

- `backend/`: Flask server, AI model, and game logic
- `frontend/`: React application and user interface
- `model/`: Gesture recognition model and training scripts

## Future Plans

- Expand gesture recognition to full alphabet and words
- Implement multiplayer functionality
- Enhance UI/UX based on user feedback

## Acknowledgments

- "Open Project IoT" hackathon organizers
- All team members and contributors

For more details, please refer to our [documentation](Docs/presentation-technique-fr.md).
