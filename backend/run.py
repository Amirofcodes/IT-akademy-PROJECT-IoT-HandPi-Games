# run.py

from flask import Flask
from flask_cors import CORS
from app.routes.game_routes import bp as game_bp
from app.routes.general_routes import bp as general_bp

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all origins
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(game_bp)
    app.register_blueprint(general_bp)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
    
