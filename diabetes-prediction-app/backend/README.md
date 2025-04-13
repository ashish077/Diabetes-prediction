# Backend README for Diabetes Prediction Application

## Overview
This project is a Diabetes Prediction Application that utilizes a machine learning model to predict whether a person has diabetes based on user input parameters. The backend is built using Python with the Flask framework, and the frontend is built with React.

## Project Structure
The backend is structured as follows:
```
backend/
├── app.py          # Main Flask application file
├── requirements.txt # Python package dependencies
└── README.md       # This file
```

## Setup Instructions

1.  **Navigate to the backend directory:**
    ```bash
    cd diabetes-prediction-app/backend
    ```

2.  **Create a virtual environment (optional but recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install Dependencies:**
    Ensure you have Python 3 and pip installed. Run the following command to install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
    *Note: You might need to use `pip3` depending on your system configuration.*

4.  **Run the Application:**
    You can run the Flask development server using:
    ```bash
    python app.py
    ```
    Alternatively, you can use the Flask CLI:
    ```bash
    export FLASK_APP=app.py # On Windows use `set FLASK_APP=app.py`
    export FLASK_ENV=development # Optional: enables debug mode
    flask run
    ```

5.  **Access the API:**
    The application will be running on `http://127.0.0.1:5000` by default.

## Usage
The backend exposes a REST API. You can send a POST request to the `/predict` endpoint with the required input parameters (details to be added) to receive a diabetes prediction.

## Dependencies
The project uses the following core dependencies:
- Flask

*(Additional dependencies for the machine learning model will be added later)*

## Testing
*(Testing setup to be added)*

## License
This project is licensed under the MIT License. See the LICENSE file for more details.