SocialMediaApi is a backend API application for a social media platform. This project demonstrates how to deploy a containerized application on Kubernetes, expose it via LoadBalancer, and monitor cluster resources using Metrics Server.

Prerequisites:-
Kubernetes cluster (Minikube / Docker Desktop / Cloud provider)
kubectl installed and configured
Docker installed
Node.js / Application Docker image built and available

Setup Instructions:-
1. Clone the repository
git clone <your-repo-url>
cd Project6/SocialMediaApi

2. Build Docker image
docker build -t socialmedia-api:latest .

3. Push Docker image (if using remote cluster)
docker tag socialmedia-api:latest <your-dockerhub-username>/socialmedia-api:latest
docker push <your-dockerhub-username>/socialmedia-api:latest

Deployment Steps:-
1. Create Kubernetes Deployment
kubectl apply -f socialmedia-deployment.yaml

2. Verify Pods
kubectl get pods -n default

You should see something like:-
socialmedia-deployment-6d6d96bfc9-gqqzr   1/1   Running
socialmedia-deployment-6d6d96bfc9-w95qs   1/1   Running

3. Expose Deployment via LoadBalancer
kubectl expose deployment socialmedia-deployment -n default --type=LoadBalancer --port=80 --target-port=4443

4. Verify Service
kubectl get svc -n default

Example output:
socialmedia-deployment   LoadBalancer   10.100.245.0   localhost   80:32057/TCP

Accessing the Application:-
The app listens internally on port 4443 in the container.
It is exposed externally via port 80.
Access via browser or Postman at:

http://localhost:<NodePort or LoadBalancer port>

Metrics Server Setup:-
Metrics Server is used to monitor CPU and memory usage for pods and nodes.

1. Apply Metrics Server manifest
kubectl apply -f metrics-server-fixed.yaml

2. Patch Metrics Server to fix certificate issue
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[
  {"op": "replace", "path": "/spec/template/spec/containers/0/args", "value": [
    "--cert-dir=/tmp",
    "--secure-port=4443",
    "--kubelet-insecure-tls",
    "--kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname",
    "--metric-resolution=15s"
  ]}
]'

3. Delete old pod to restart Metrics Server
kubectl delete pod -n kube-system -l k8s-app=metrics-server

4. Check Metrics Server pod status
kubectl get pods -n kube-system | grep metrics-server

5. Verify metrics availability
kubectl top nodes
kubectl top pods -n default

Useful Commands:-
1. Get pods:
kubectl get pods -n default

2. Get services:
kubectl get svc -n default

3. Check logs of a pod:
kubectl logs -n default <pod-name>

4. Delete a pod (force restart):
kubectl delete pod -n default <pod-name>

5. Expose deployment via LoadBalancer:
kubectl expose deployment <deployment-name> --type=LoadBalancer --port=80 --target-port=<container-port>


Project Structure
Project6/
│
└───SocialMediaApi/
    │   Dockerfile
    │   metrics-server-fixed.yaml
    │   socialmedia-deployment.yaml
    │   README.md
    │   <application source files>


