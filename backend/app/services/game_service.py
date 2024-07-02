class GameService:
    def __init__(self):
        self.current_game = None

    def start_game(self):
        if self.current_game is None:
            self.current_game = {
                'score': 0,
                'current_letter': 'A',
                'letters_done': []
            }
            return {'message': 'Game started', 'current_letter': self.current_game['current_letter']}
        else:
            return {'message': 'Game already in progress'}

    def end_game(self):
        if self.current_game is not None:
            final_score = self.current_game['score']
            self.current_game = None
            return {'message': 'Game ended', 'final_score': final_score}
        else:
            return {'message': 'No game in progress'}

    def check_gesture(self, gesture):
        if self.current_game is None:
            return {'message': 'No game in progress'}
        
        if gesture == self.current_game['current_letter']:
            self.current_game['score'] += 1
            self.current_game['letters_done'].append(self.current_game['current_letter'])
            
            if len(self.current_game['letters_done']) == 26:
                return self.end_game()
            
            self.current_game['current_letter'] = self._get_next_letter()
            return {'message': 'Correct!', 'new_letter': self.current_game['current_letter'], 'score': self.current_game['score']}
        else:
            return {'message': 'Incorrect, try again'}

    def _get_next_letter(self):
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for letter in alphabet:
            if letter not in self.current_game['letters_done']:
                return letter

game_service = GameService()
