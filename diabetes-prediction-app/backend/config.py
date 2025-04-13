import os
from pathlib import Path

class Config:
    BASE_DIR = Path(__file__).resolve().parent
    MODEL_PATH = os.path.join(BASE_DIR, "model.joblib")
    SCALER_PATH = os.path.join(BASE_DIR, "scaler.joblib")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"