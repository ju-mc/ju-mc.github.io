from flask import Flask, request, jsonify
import base64
import os
from imageToText import generate_description

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the drawing app!"

@app.route('/process-drawing', methods=['POST'])
def process_drawing():
    data = request.json
    image_data = data['image']
    image_data = image_data.split(',')[1]  # Remove the base64 prefix

    # Decode the base64 image
    with open("drawing.png", "wb") as fh:
        fh.write(base64.b64decode(image_data))

    # Here, add your logic to process the image and generate a description
    description = generate_description("drawing.png")

    return jsonify({"description": description})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)