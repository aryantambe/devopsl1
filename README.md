Apache on Minikube (NodePort)

![MG](image.png)

How to run (PowerShell, run as Administrator if necessary):
1. Start Minikube (docker driver recommended)
   minikube start --driver=docker
   ![alt text](image-5.png)

2. From the extracted folder, create the ConfigMap, apply the deployment and service:
   kubectl create configmap apache-index --from-file=index.html=./index.html
   
3. Create ConfigMap   
   kubectl apply -f apache-deployment.yaml
   ![IMG](image-1.png)
   kubectl apply -f apache-service.yaml
   ![IMG](image-2.png)

3. Wait for the pod to be ready:
   kubectl get pods -l app=apache -o wide
   ![IMG](image-3.png)

4. Get access URL:

   minikube service apache-nodeport
   ![IMG](image-4.png)
 
