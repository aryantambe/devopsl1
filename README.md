# 📌 Social Media Infra Challenge – Kubernetes + Docker + HPA

This project is part of a **DevOps challenge** to containerize a Python (FastAPI) social media application, deploy it on **Kubernetes (Minikube)**, expose it as a service, and enable **Horizontal Pod Autoscaling (HPA)** for scalability.  

---

## 📂 Project Structure
.
├── main.py # FastAPI application entrypoint
├── models.py # Data models
├── requirements.txt # Python dependencies
├── Dockerfile # Docker build instructions
├── deployment.yaml # Kubernetes Deployment
├── service.yaml # Kubernetes Service
├── hpa.yaml # Kubernetes Horizontal Pod Autoscaler

yaml
Copy code

---

## ⚡ Features
- Containerized FastAPI app using **Docker** 🐳  
- Deployment on **Kubernetes (Minikube)** ☸️  
- Exposed via **Service (LoadBalancer / NodePort)** 🌍  
- **Horizontal Pod Autoscaler (HPA)** enabled for auto-scaling 📈  
- Configurable resource requests & limits 💾  

---

## 🛠️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/social-media-infra.git
cd social-media-infra
2️⃣ Build Docker Image
bash
Copy code
docker build -t social-media:latest .
3️⃣ (Option A) Push Image to DockerHub
bash
Copy code
docker tag social-media:latest your-dockerhub-username/social-media:v1
docker push your-dockerhub-username/social-media:v1
3️⃣ (Option B) Load Image into Minikube (recommended for local dev)
bash
Copy code
minikube image load social-media:latest
🚀 Deploy on Kubernetes
1️⃣ Start Minikube
bash
Copy code
minikube start --driver=docker --cpus=4 --memory=3500
Enable required addons:

bash
Copy code
minikube addons enable metrics-server
minikube addons enable dashboard
2️⃣ Apply Manifests
bash
Copy code
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f hpa.yaml
3️⃣ Check Status
bash
Copy code
kubectl get pods
kubectl get svc
kubectl get hpa
4️⃣ Access the Service
bash
Copy code
minikube service socialmedia-service
This will open the app in your browser (on a local Minikube IP & port).

📊 Testing Autoscaling
Run a load generator pod:

bash
Copy code
kubectl run -it load-generator --rm --image=busybox /bin/sh
Inside the pod:

sh
Copy code
while true; do wget -q -O- http://socialmedia-service; done
Meanwhile, monitor scaling:

bash
Copy code
kubectl get hpa --watch
kubectl get pods --watch
You should see pods scale from 2 → up to 5 depending on CPU load.

📸 Screenshots / Demo
✅ Pods running in Minikube

✅ HPA scaling pods under load

✅ App accessible via service

(Add your screenshots here)

🛠️ Tech Stack
Python 3.11

FastAPI (Uvicorn ASGI server)

Docker

Kubernetes (Minikube)

Horizontal Pod Autoscaler (HPA)

Metrics Server

📌 Author
👤 Atul Goyal
🔗 LinkedIn | GitHub

