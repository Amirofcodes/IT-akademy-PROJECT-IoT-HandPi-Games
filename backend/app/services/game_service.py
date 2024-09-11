class GameService:
    def __init__(self):
        self.current_game = None

    def start_game(self):
        if self.current_game is None:
            self.current_game = {
                'score': 0,
                'current_letter_index': 0,
                'letters': ['A', 'B', 'C', 'D']  # Only letters A, B, C, D for this mini-game
            }
            return {
                'message': 'Game started',
                'current_letter': self.current_game['letters'][self.current_game['current_letter_index']]
            }
        else:
            return {'message': 'Game already in progress'}

    def end_game(self):
        if self.current_game is not None:
            final_score = self.current_game['score']
            self.current_game = None
            return {
                'message': 'Game ended',
                'final_score': final_score
            }
        else:
            return {'message': 'No game in progress'}

    def check_gesture(self, gesture):
        if self.current_game is None:
            return {'message': 'No game in progress'}

        expected_letter = self.current_game['letters'][self.current_game['current_letter_index']]

        if gesture == expected_letter:
            self.current_game['score'] += 1
            self.current_game['current_letter_index'] += 1

            if self.current_game['current_letter_index'] == len(self.current_game['letters']):
                return self.end_game()

            return {
                'message': 'Correct!',
                'new_letter': self.current_game['letters'][self.current_game['current_letter_index']],
                'score': self.current_game['score']
            }
        else:
            return {'message': 'Incorrect, try again'}

game_service = GameService()
