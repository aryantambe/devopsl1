# Retail App (Spring Boot, Docker, Jenkins, Trivy)

Simple Spring Boot service for a retail company, containerized and built via Jenkins. The pipeline builds, pushes to Docker Hub, and scans the image with Trivy.

## Endpoints
- `/` → "Welcome to Retail App"
- `/health` → "OK"

## Prereqs
- Docker Desktop
- Jenkins in Docker with Docker socket mounted
- Docker Hub account + Jenkins creds ID: `dockerhub-creds`

## Build locally
```bash
mvn clean package
