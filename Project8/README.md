## Project 8 — Microservices Deployment using Docker, Kubernetes & Jenkins
### Overview

### Objective:
Implement a complete microservices-based architecture with four services — Auth, Users, Products, and Orders — containerized using Docker, orchestrated with Kubernetes, and tested locally on Docker Desktop’s built-in cluster.

Each service exposes REST APIs for communication and uses a simulated in-memory database (for simplicity).

---------------------------------------------------------------------------------------------

### Project Architecture
+-----------------------------------------------+
|                  Client / API                 |
+-----------------------------------------------+
        |            |             |            |
        v            v             v            v
+-------------+ +-------------+ +-------------+ +-------------+
|  Auth Svc   | |  Users Svc  | | ProductsSvc | | Orders Svc  |
| (JWT Login) | | (User CRUD) | | (Product DB)| | (Order Mgmt)|
+-------------+ +-------------+ +-------------+ +-------------+
        |            |             |            |
        +------------+-------------+------------+
                     |
                     v
              MongoDB (optional)
---------------------------------------------------------------------------------------------

### Microservices:
Auth Service (port 8081): Handles authentication (JWT simulation).
Users Service (port 8082): Manages user data.
Products Service (port 8083): Manages product list and prices.
Orders Service (port 8084): Manages user orders and product mapping.

---------------------------------------------------------------------------------------------

### Tech Stack
Component	Technology
Language	Node.js (Express)
Containers	Docker
Orchestration	Kubernetes
Registry	Docker Hub
Authentication	JWT (simulated)
Monitoring	kubectl get pods / logs
Testing	Invoke-RestMethod (PowerShell) / curl

---------------------------------------------------------------------------------------------

### Project Structure
Project8/
├─ services/
│  ├─ auth/
│  │  ├─ package.json
│  │  ├─ app.js
│  │  └─ Dockerfile
│  ├─ users/   (same files)
│  ├─ products/(same files)
│  └─ orders/  (same files)
└─ k8s/
   ├─ namespace.yaml
   ├─ secrets.yaml
   ├─ configmap.yaml
   ├─ auth-deployment.yaml
   ├─ users-deployment.yaml
   ├─ products-deployment.yaml
   ├─ orders-deployment.yaml
   ├─ services.yaml
   ├─ pv-pvc.yaml
   ├─ mongo-deployment.yaml

---------------------------------------------------------------------------------------------

### Step-by-Step Implementation
1. Build Docker Images

From each service folder:
    # Auth Service
    cd auth
    docker build -t anushreedahiya/auth:1.0.0 .
    docker push anushreedahiya/auth:1.0.0

    # Users Service
    cd ../users
    docker build -t anushreedahiya/users:1.0.0 .
    docker push anushreedahiya/users:1.0.0

    # Products Service
    cd ../products
    docker build -t anushreedahiya/products:1.0.0 .
    docker push anushreedahiya/products:1.0.0

    # Orders Service
    cd ../orders
    docker build -t anushreedahiya/orders:1.0.0 .
    docker push anushreedahiya/orders:1.0.0

2. Deploy on Kubernetes

Create a namespace for isolation:
    kubectl create namespace project8

Deploy all microservices:
    kubectl apply -f auth/k8s-auth.yaml -n project8
    kubectl apply -f users/k8s-users.yaml -n project8
    kubectl apply -f products/k8s-products.yaml -n project8
    kubectl apply -f orders/k8s-orders.yaml -n project8

(Optional) Deploy MongoDB if used:
    kubectl apply -f mongo/k8s-mongo.yaml -n project8

Verify all pods and services:
    kubectl get pods -n project8
    kubectl get svc -n project8

3. Port Forward for Local Testing
Forward services to local ports:
    kubectl port-forward svc/auth 8081:8081 -n project8
    kubectl port-forward svc/users 8082:8082 -n project8
    kubectl port-forward svc/products 8083:8083 -n project8
    kubectl port-forward svc/orders 8084:8084 -n project8

---------------------------------------------------------------------------------------------

### API Testing
1. Users Service
    Invoke-RestMethod -Uri http://localhost:8082/api/users -Method GET

Output:
id name
-- ----
1 John Doe
2 Jane Smith

2. Products Service
Invoke-RestMethod -Uri http://localhost:8083/api/products -Method GET

Output:
id name   price
-- ----   -----
1 Laptop  1000
2 Phone    500

3. Orders Service
Invoke-RestMethod -Uri http://localhost:8084/api/orders -Method GET

Output:
id userId productId quantity
-- ------ --------- --------
1  1      2         1
2  2      1         2

4. Auth Service (Optional JWT Simulation)
Invoke-RestMethod -Uri http://localhost:8081/api/auth/login -Method POST -Body (@{username="test";password="test"} | ConvertTo-Json) -ContentType "application/json"

(If endpoint is not implemented, skip this step.)

---------------------------------------------------------------------------------------------

### Clean-Up Commands
After testing, delete everything related to Project8 safely.
Stop and Delete Kubernetes Deployments
    kubectl delete namespace project8

Delete Old Pods
    kubectl delete pod hey --namespace=default

Stop Docker Containers
    docker stop $(docker ps -q)

Remove All Docker Containers and Images
    docker rm $(docker ps -aq)
    docker rmi $(docker images -q)

---------------------------------------------------------------------------------------------

### Results & Verification:-
    All services were successfully deployed as separate pods.
    Inter-service communication tested via REST APIs.
    Health endpoints verified:

        /health  →  "Service healthy"
        /api/users, /api/products, /api/orders  → returned correct data

    Deployment completed using Docker Desktop Kubernetes.

---------------------------------------------------------------------------------------------

### Learnings:-
Understanding Microservices architecture and API modularity
Containerization with Docker
Deployment automation via Kubernetes
Service isolation using namespaces
API testing via PowerShell (Invoke-RestMethod)
Clean-up and lifecycle management of containers and pods
