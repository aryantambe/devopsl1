Mongo + Mongo Express Kubernetes setup
=====================================

![img](image.png)
Files included:
- secret.yaml            : Kubernetes Secret (base64 example values)
- configmap.yaml         : ConfigMap with mongo service name
- mongo-deployment.yaml  : MongoDB Deployment and Service
- mongo-express.yaml     : Mongo Express Deployment and NodePort Service
- deploy-all.yaml        : (optional) combined file for convenience

How to use
----------
1. (Optional) Replace the base64 values in secret.yaml with your own:
   echo -n "YOUR_USERNAME" | base64
   echo -n "YOUR_PASSWORD" | base64

2. Apply the manifests:
   kubectl apply -f secret.yaml
   kubectl apply -f configmap.yaml
   kubectl apply -f mongo-deployment.yaml
   kubectl apply -f mongo-express.yaml

   Or apply all at once:
   kubectl apply -f deploy-all.yaml

3. Check resources:
   kubectl get pods
   kubectl get svc

4. Access Mongo Express in your browser:
   http://<NodeIP>:30000
   (If using minikube, use: minikube ip -> http://<minikube-ip>:30000)

