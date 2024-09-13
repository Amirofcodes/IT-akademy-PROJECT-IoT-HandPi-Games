from flask import Flask
from flask_cors import CORS
from app.routes.game_routes import bp as game_bp
from app.routes.general_routes import bp as general_bp

app = Flask(__name__)

# Enable CORS for frontend communication
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Register blueprints
app.register_blueprint(game_bp)    # Registers /api/game routes
app.register_blueprint(general_bp)  # Registers other general routes

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
