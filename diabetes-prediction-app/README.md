# Diabetes Prediction Application

A full-stack application for predicting diabetes using machine learning.

## Project Structure
```
diabetes-prediction-app/
├── backend/           # Flask API server
└── frontend/         # React frontend application
```

## Prerequisites
- Docker and Docker Compose
- Node.js 16+ (for local development)
- Python 3.9+ (for local development)

## Quick Start with Docker

1. Clone the repository
2. Build and run the application:
```bash
docker-compose up --build
```
3. Access the application at http://localhost:80

## Local Development

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the development server:
```bash
flask run
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Production Deployment

### Using Docker (Recommended)
1. Update the environment variables in docker-compose.yml if needed
2. Build and run the containers:
```bash
docker-compose -f docker-compose.yml up --build -d
```

### Manual Deployment
#### Backend
1. Set up a production-grade WSGI server (e.g., Gunicorn)
2. Configure environment variables
3. Run the application:
```bash
gunicorn --bind 0.0.0.0:5000 app:app
```

#### Frontend
1. Create production build:
```bash
npm run build
```
2. Serve the static files from the `dist` directory using a web server like Nginx

## Environment Variables

### Backend
- `FLASK_ENV`: Set to 'production' in production
- `CORS_ORIGINS`: Comma-separated list of allowed origins
- `PORT`: Port number (default: 5000)

### Frontend
- `VITE_API_URL`: Backend API URL
- `VITE_ENV`: Environment (production/development)

## Security Considerations
- CORS is configured to allow only specified origins
- Input validation is implemented on both frontend and backend
- Error handling is implemented to prevent information leakage
- Production builds are minified and optimized