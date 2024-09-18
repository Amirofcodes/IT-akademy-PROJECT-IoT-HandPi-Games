import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GameService:
    def __init__(self):
        self.current_game = None

    def start_game(self):
        if self.current_game is None:
            self.current_game = {
                'score': 0,
                'current_letter_index': 0,
                'letters': ['A', 'B', 'C', 'D']
            }
            logger.info("Game started")
            return {
                'message': 'Game started',
                'current_letter': self.current_game['letters'][self.current_game['current_letter_index']]
            }
        else:
            logger.info("Attempted to start a game while one is in progress")
            return {'message': 'Game already in progress'}

    def end_game(self):
        if self.current_game is not None:
            final_score = self.current_game['score']
            self.current_game = None
            logger.info(f"Game ended with score: {final_score}")
            return {
                'message': 'Game ended',
                'final_score': final_score
            }
        else:
            logger.warning("Attempted to end a game when no game was in progress")
            return {'message': 'No game in progress'}

    def check_gesture(self, gesture):
        if self.current_game is None:
            logger.warning("Attempted to check gesture when no game was in progress")
            return {'message': 'No game in progress'}

        expected_letter = self.current_game['letters'][self.current_game['current_letter_index']]
        logger.info(f"Checking gesture: {gesture}, Expected: {expected_letter}")

        if gesture == expected_letter:
            self.current_game['score'] += 1
            self.current_game['current_letter_index'] += 1
            logger.info(f"Correct gesture. New score: {self.current_game['score']}")

            if self.current_game['current_letter_index'] == len(self.current_game['letters']):
                logger.info("Game completed")
                return self.end_game()

            new_letter = self.current_game['letters'][self.current_game['current_letter_index']]
            return {
                'message': 'Correct!',
                'new_letter': new_letter,
                'score': self.current_game['score']
            }
        else:
            logger.info(f"Incorrect gesture: {gesture}")
            return {
                'message': 'Incorrect, try again',
                'expected_letter': expected_letter,
                'score': self.current_game['score']
            }

game_service = GameService()