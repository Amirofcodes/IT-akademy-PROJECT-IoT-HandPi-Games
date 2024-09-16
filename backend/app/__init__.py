from flask import Flask
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions here (e.g., SQLAlchemy, if you're using a database)

    # Register blueprints
    from app.routes import game_routes, user_routes, general_routes
    app.register_blueprint(game_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(general_routes.bp)  # Register the general routes

    return app
