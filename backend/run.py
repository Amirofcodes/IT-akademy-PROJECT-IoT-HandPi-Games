from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register your blueprints and routes here
from app.routes.general_routes import bp as general_bp
app.register_blueprint(general_bp)

if __name__ == '__main__':
    app.run(debug=True)
