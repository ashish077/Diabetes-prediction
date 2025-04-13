from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from config import Config

app = Flask(__name__)
CORS(app, origins=Config.CORS_ORIGINS)

# Load the model and scaler at startup
try:
    model = joblib.load(Config.MODEL_PATH)
    scaler = joblib.load(Config.SCALER_PATH)
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    raise

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "error": "Bad Request",
        "message": str(error.description)
    }), 400

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal Server Error",
        "message": "An unexpected error occurred"
    }), 500

@app.route('/')
def home():
    return "Diabetes Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return bad_request("No data provided")

        required_fields = [
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ]
        
        # Validate all required fields are present
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return bad_request(f"Missing required fields: {', '.join(missing_fields)}")

        # Convert input data to numpy array
        input_data = np.array([[
            float(data[field]) for field in required_fields
        ]])

        # Scale the input data
        scaled_data = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(scaled_data)
        probability = model.predict_proba(scaled_data)[0][1]

        return jsonify({
            "prediction": int(prediction[0]),
            "probability": float(probability),
            "message": "Diabetes" if prediction[0] == 1 else "No Diabetes"
        })

    except ValueError as e:
        return bad_request(f"Invalid input data: {str(e)}")
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return internal_error(e)

if __name__ == '__main__':
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
