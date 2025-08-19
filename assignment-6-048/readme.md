# Assignment 6 - Social Media Underlying Infra Challenges

## Project Overview
This project demonstrates **application scalability** using **Kubernetes Horizontal Pod Autoscaler (HPA)** for a social media application.

## Files Included
- `deployment.yaml` → Defines the Deployment with resource requests/limits.
- `service.yaml` → Exposes the application to users.
- `hpa.yaml` → Configures autoscaling based on CPU utilization.
- `namespace.yaml` → (Optional) Creates a namespace for the app.

## Steps to Apply
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml -n socialmedia-namespace
kubectl apply -f k8s/service.yaml -n socialmedia-namespace
kubectl apply -f k8s/hpa.yaml -n socialmedia-namespace
