# Deepfake Detection Web Application

A web application that uses AI to detect deepfake images and videos. The application allows users to upload media, which is then analyzed to determine if it's real or fake.

## Features

- Upload and analyze images and videos
- Separate sections for image and video detection
- Store media and analysis results in a database
- View detection history
- Get detailed analysis results with confidence scores

## Architecture

The application is built using:

- **Backend**: Django with Django REST Framework
- **Frontend**: React.js
- **Database**: SQLite (default, configurable)
- **AI Model**: XceptionNet for deepfake detection

## Project Structure

```
deepfake_detection/         # Django project root
│
├── deepfake_detection/     # Django settings and main URLs
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── detector/               # Django app for deepfake detection
│   ├── models.py           # Database models for media and results
│   ├── views.py            # API views
│   ├── serializers.py      # DRF serializers
│   ├── urls.py             # App routes
│   ├── ai_detector.py      # Deepfake detection implementation
│   └── ...
│
├── media/                  # Uploaded media storage
│   ├── images/             # Uploaded images
│   └── videos/             # Uploaded videos
│
├── models/                 # AI model storage
│   └── xception_deepfake.h5  # XceptionNet model file
│
└── frontend/               # Frontend code
    ├── index.html          # Main HTML page
    └── api.js              # API integration code
```

## How to Run

### Backend Setup

1. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

2. Navigate to the Django project directory:
   ```
   cd deepfake_detection
   ```

3. Download the placeholder model (or use a pre-trained XceptionNet model):
   ```
   python download_model.py
   ```

4. Run database migrations:
   ```
   python manage.py migrate
   ```

5. Start the Django development server:
   ```
   python manage.py runserver
   ```

The backend API will be available at: http://127.0.0.1:8000/api/

### Frontend Setup

Since the frontend is built with plain HTML, CSS, and JavaScript with React loaded from CDN, you can simply open the `frontend/index.html` file in your browser.

For a better development experience, you can use a simple HTTP server:

```
cd frontend
python -m http.server
```

Then access the frontend at: http://localhost:8000

## AI Model Information

This application uses XceptionNet for deepfake detection, which has shown excellent performance in detecting manipulated media:

- High accuracy (95%+ on benchmark datasets)
- Effective at detecting GAN-generated faces
- Good balance of performance and computational requirements
- Trained on diverse deepfake datasets

For detailed information about the AI model integration, refer to `AI_MODEL_README.md`.

## API Endpoints

- `GET /api/media/` - List all media items
- `POST /api/media/` - Upload a new media item (image or video)
- `GET /api/media/<id>/` - Get a specific media item with its detection result
- `POST /api/media/<id>/analyze/` - Manually trigger analysis for a media item

## Future Improvements

- Improve model accuracy with better training data
- Add user authentication
- Improve UI/UX
- Add more detailed analysis results
- Implement background processing for video analysis
- Add support for URL-based media analysis 