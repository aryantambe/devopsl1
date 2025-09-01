# Simple Social Media Application

A simple social media application built with FastAPI (backend) and vanilla HTML/CSS/JavaScript (frontend), containerized with Docker and deployed on Kubernetes.

## Features

- 👥 User registration with username and email
- 📝 Create and share posts
- ❤️ Like posts
- 🗑️ Delete posts
- 📱 Responsive design
- 🔄 Real-time updates

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Port**: 8000

## Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Styling
│   └── script.js           # JavaScript functionality
├── deployment.yaml         # Kubernetes deployment
├── service.yaml           # Kubernetes service
├── pod.yaml              # Kubernetes pod (optional)
├── Dockerfile            # Docker configuration
├── build.ps1            # Build script
├── deploy.ps1           # Deployment script
├── cleanup.ps1          # Cleanup script
└── README.md            # This file
```

## Quick Start

### Prerequisites

- Docker Desktop installed and running
- Kubernetes enabled in Docker Desktop (or minikube/kind)
- kubectl installed and configured
- PowerShell (for Windows scripts)

### 1. Build the Docker Image

```powershell
.\build.ps1
```

This will:
- Build the Docker image as `social-media-app:latest`
- Optionally run it locally for testing on http://localhost:8000

### 2. Deploy to Kubernetes

```powershell
.\deploy.ps1
```

This will:
- Deploy the application to your Kubernetes cluster
- Create the necessary services
- Show status and access instructions

### 3. Access the Application

After deployment, access the application using:

```bash
kubectl port-forward service/social-media-service 8000:8000
```

Then visit: http://localhost:8000

### 4. Monitor the Application

```bash
# Check pods
kubectl get pods

# Check services
kubectl get services

# View logs
kubectl logs -f deployment/social-media-deployment

# Describe deployment
kubectl describe deployment social-media-deployment
```

### 5. Cleanup

```powershell
.\cleanup.ps1
```

## Manual Commands

### Build Docker Image

```bash
docker build -t social-media-app:latest .
```

### Run Locally (Docker)

```bash
docker run -d -p 8000:8000 --name social-media-test social-media-app:latest
```

### Deploy to Kubernetes

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Access via Port Forward

```bash
kubectl port-forward service/social-media-service 8000:8000
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/{post_id}` - Get a specific post
- `PUT /api/posts/{post_id}/like` - Like a post
- `DELETE /api/posts/{post_id}` - Delete a post

### Health
- `GET /health` - Health check endpoint

## Configuration

### Environment Variables

- `PORT`: Application port (default: 8000)

### Kubernetes Resources

- **CPU**: 250m request, 500m limit
- **Memory**: 256Mi request, 512Mi limit
- **Replicas**: 2 (can be scaled)

## Troubleshooting

### Common Issues

1. **Image not found**: Make sure you've built the Docker image locally
2. **Port conflicts**: Ensure port 8000 is available
3. **Kubernetes not running**: Check if Docker Desktop has Kubernetes enabled

### Useful Commands

```bash
# Check if image exists
docker images | grep social-media-app

# Check container logs
docker logs social-media-test

# Check Kubernetes resources
kubectl get all

# Delete stuck pods
kubectl delete pod --all

# Restart deployment
kubectl rollout restart deployment/social-media-deployment
```

## Development

### Running Locally (without Docker)

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Start the development server:
```bash
python main.py
```

3. Visit http://localhost:8000

### Making Changes

1. Make your changes to the code
2. Rebuild the Docker image: `.\build.ps1`
3. Redeploy to Kubernetes: `kubectl rollout restart deployment/social-media-deployment`

## License

This project is for educational purposes.