# Project 9: Apache2 Server Deployment on Kubernetes

## Objective
Deploy an **Apache2 web server** inside a Kubernetes cluster and access it from the host machine using **NodePort** and **LoadBalancer** services.

---

## Project Structure
Project9/
├─ k8s/
│  ├─ namespace.yaml
│  ├─ configmap-index.yaml
│  ├─ deployment-apache.yaml
│  ├─ service-nodeport.yaml
│  ├─ service-loadbalancer.yaml   # optional (Docker Desktop supports LoadBalancer->localhost)
│  └─ ingress.yaml                # optional (if an ingress controller is present)
└─ web/
   └─ index.html


---

## Kubernetes Manifests

### 1. `namespace.yaml`
Defines a separate namespace for the project.

apiVersion: v1
kind: Namespace
metadata:
  name: project9


### 2. `configmap-index.yaml`
Contains custom HTML page for Apache.

apiVersion: v1
kind: ConfigMap
metadata:
  name: apache-index
  namespace: project9
data:
  index.html: |
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Project9 – Apache2 on Kubernetes</title>
      </head>
      <body>
        <h1>Project 9 – Apache2 server on Kubernetes</h1>
        <p>This page is served from an Apache2 Pod deployed in Kubernetes!</p>
      </body>
    </html>

### 3. `deployment-apache.yaml`
Deploys Apache2 with 2 replicas and mounts ConfigMap.

apiVersion: apps/v1
kind: Deployment
metadata:
  name: apache-deployment
  namespace: project9
spec:
  replicas: 2
  selector:
    matchLabels:
      app: apache
  template:
    metadata:
      labels:
        app: apache
    spec:
      containers:
        - name: apache
          image: httpd:latest
          ports:
            - containerPort: 80
          volumeMounts:
            - name: apache-index
              mountPath: /usr/local/apache2/htdocs/
      volumes:
        - name: apache-index
          configMap:
            name: apache-index

### 4. `service-nodeport.yaml`
Expose Apache deployment using NodePort.

apiVersion: v1
kind: Service
metadata:
  name: apache-nodeport
  namespace: project9
spec:
  type: NodePort
  selector:
    app: apache
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080


### 5. `service-loadbalancer.yaml`
Expose Apache deployment using LoadBalancer.

apiVersion: v1
kind: Service
metadata:
  name: apache-lb
  namespace: project9
spec:
  type: LoadBalancer
  selector:
    app: apache
  ports:
    - port: 80
      targetPort: 80


---
## Deployment Steps
### 1. Create Namespace
kubectl apply -f k8s/namespace.yaml

### 2. Create ConfigMap
kubectl apply -f k8s/configmap-index.yaml

### 3. Deploy Apache
kubectl apply -f k8s/deployment-apache.yaml

### 4. Expose services
kubectl apply -f k8s/service-nodeport.yaml
kubectl apply -f k8s/service-loadbalancer.yaml

### 5. Verify
kubectl get ns
kubectl get pods -n project9 -o wide
kubectl get deploy -n project9
kubectl get svc -n project9

### 6. Test access
curl http://localhost:30080

---
## Architecture
        ┌────────────────────────────┐
        │  Kubernetes Cluster         │
        │  (Docker Desktop)           │
        ├────────────────────────────┤
        │  Namespace: project9        │
        │                            │
        │  ┌──────────────────────┐  │
        │  │ Apache Deployment    │  │
        │  │ - 2 Pods (httpd)     │  │
        │  │ - ConfigMap Mounted  │  │
        │  └──────────────────────┘  │
        │            │               │
        │  ┌──────────────────────┐  │
        │  │ Services             │  │
        │  │ - NodePort: 30080    │  │
        │  │ - LoadBalancer: 80   │  │
        │  └──────────────────────┘  │
        └────────────────────────────┘
                    │
                    ▼
          🌍 http://localhost:30080

---
## Verification
Access NodePort: http://localhost:30080
Access LoadBalancer: http://localhost:<LB_PORT> (Docker Desktop maps LoadBalancer to localhost)

### Expected Output
When you visit http://localhost:30080 or run curl http://localhost:30080
You should see:
    Project 9 – Apache2 server on Kubernetes
    This page is served from an Apache2 Pod deployed in Kubernetes!