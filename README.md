# 🧱 Apache Deployment on Minikube (Kubernetes)

## 📘 Overview
This project demonstrates how to deploy an Apache web server on a local Kubernetes cluster using **Minikube** and **kubectl**.  
It verifies that Minikube and Kubernetes are properly configured on your system.

---

## ⚙️ Prerequisites
Make sure you have the following installed:
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- VS Code (optional for managing YAML files)

---

## 🚀 Steps to Run

### 1. Start Minikube
```bash
minikube start

2. Check Cluster Status
Bash

minikube status
kubectl get nodes
3. Deploy Apache
Bash

kubectl create deployment apache-deployment --image=httpd
4. Expose Deployment
Expose the Apache container as a NodePort service:

Bash

kubectl expose deployment apache-deployment --type=NodePort --port=80
5. Check Pods and Services
Bash

kubectl get pods
kubectl get svc
6. Access Apache in Browser
Get the Minikube service URL:

Bash

minikube service apache-deployment --url