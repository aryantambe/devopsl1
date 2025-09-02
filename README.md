# Social Media App (Python + Flask)

This is a simple Social Media API built with Flask, containerized with Docker, and deployed on Kubernetes with autoscaling.

## Run Locally
```
pip install -r requirements.txt
python app/main.py
```

## Docker
```
docker build -t socialmedia-app .
docker run -p 5000:5000 socialmedia-app
```

## Kubernetes
```
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/hpa.yaml
```
