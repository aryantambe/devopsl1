Overview:- 
This project demonstrates a MongoDB database and Mongo Express web interface running on a Kubernetes cluster. The project uses:
    Kubernetes Deployment and Service objects
    Secret resources for database credentials
    NodePort service for accessing Mongo Express UI
Mongo Express is configured to use credentials stored securely in Kubernetes secrets, rather than hard-coded defaults.

Prerequisites:-
    Windows / Linux / macOS
    Docker Desktop
    (with Kubernetes enabled)
    kubectl
    installed
    Minikube
    (optional if using Docker Desktop)

Setup Instructions:-
1. Create a namespace for the project:
    kubectl create namespace mongo-project

2. Create MongoDB secret:
kubectl create secret generic mongo-secret \
  --from-literal=MONGO_INITDB_ROOT_USERNAME=admin \
  --from-literal=MONGO_INITDB_ROOT_PASSWORD=admin123 \
  -n mongo-project

3. Deploy MongoDB:
    kubectl apply -f mongo-deployment.yaml -n mongo-project

4. Deploy Mongo Express:
    kubectl apply -f mongo-express-deployment.yaml -n mongo-project

5. Restart deployments (if needed to pick up secret changes):
    kubectl rollout restart deployment mongo -n mongo-project
    kubectl rollout restart deployment mongo-express -n mongo-project

Kubernetes Resources:-
| Resource   | Name                  | Type       | Purpose                          |
| ---------- | --------------------- | ---------- | -------------------------------- |
| Namespace  | mongo-project         | Namespace  | Isolates project resources       |
| Secret     | mongo-secret          | Secret     | Stores DB credentials            |
| Deployment | mongo                 | Deployment | MongoDB database                 |
| Service    | mongo-service         | ClusterIP  | Internal access to MongoDB       |
| Deployment | mongo-express         | Deployment | Web UI for MongoDB               |
| Service    | mongo-express-service | NodePort   | External access to Mongo Express |


Testing & Access:-
1. Check pods and services:
    kubectl get pods -n mongo-project
    kubectl get svc -n mongo-project

2. Access Mongo Express UI:
Open a browser and go to:
http://localhost:<NodePort>

3. Replace <NodePort> with the value from kubectl get svc mongo-express-service -n mongo-project.
Login credentials:
Username: admin
Password: admin123 (from Kubernetes secret)


Troubleshooting:-
Mongo Express repeatedly asks for login:
    Ensure ME_CONFIG_MONGODB_ADMINUSERNAME and ME_CONFIG_MONGODB_ADMINPASSWORD in deployment YAML point to the correct secret keys.
    Delete old pods to force restart:
        kubectl delete pod -l app=mongo-express -n mongo-project

MongoDB connection issues:
    Verify mongo-service ClusterIP is reachable from Mongo Express pods:
        kubectl run test-pod -it --rm --image=busybox -n mongo-project -- sh
        wget -qO- mongo-service:27017

Project Structure
Project7/
│
├── RetailAppApplication/
│   ├── mongo-deployment.yaml
│   ├── mongo-express-deployment.yaml
│   └── README.md
│
└── other files...


mongo-deployment.yaml – MongoDB deployment & service
mongo-express-deployment.yaml – Mongo Express deployment & service
README.md – Project documentation