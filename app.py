from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from api.HealthHandler import HealthHandler

import os



# Build the HTTP handler with appropriate static file locations specified.
#   - Required: <code> cd frontend && npm build </code>
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
api = Api(app)


# Define the root handler for this application
@app.route("/", defaults={'path':''})
def index(path):
    """Serve the expected /index.html which will launch our React client application. This will then communicate
    with the API backend that is defined or mapped with resources below."""
    return send_from_directory(app.static_folder,'index.html')


# Resource handlers

api.add_resource(HealthHandler, '/health')


if __name__ == "__main__":
    app.config['ENV'] = os.environ['ENVIRONMENT'] if os.environ['ENVIRONMENT'] else "production"
    app.run(debug=False, port=3000, host='0.0.0.0')


# End of File