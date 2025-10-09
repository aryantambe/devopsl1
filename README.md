Step 1: Start Minikube again

After you restart your laptop, open PowerShell or terminal and run:

minikube start


This starts your local Kubernetes cluster again.

Minikube remembers previous configurations but pods are not running yet.

Step 2: Check your cluster

Check if your cluster is running:

kubectl get nodes


You should see something like:

NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    master   1d    v1.33.1

Step 3: Check your previous resources

See if your namespace and services exist:

kubectl get all -n mongo-app


Most likely, pods will be in Pending/Not Running state because the cluster restarted.

Step 4: Apply your YAML file again

Your YAML file (mongo-stack.yaml) defines all your resources. Apply it to recreate pods, services, and secrets:

kubectl apply -f mongo-stack.yaml


Kubernetes will check your YAML and create pods if they don’t exist.

Since your PVC exists, MongoDB data will remain safe.

Step 5: Check pod status

Make sure both pods are running:

kubectl get pods -n mongo-app


You should see something like:

NAME                                    READY   STATUS    AGE
mongo-deployment-xxxxxx                 1/1     Running  1m
mongo-express-deployment-xxxxxx         1/1     Running  1m


If Mongo Express says Waiting for mongo:27017, wait a few seconds — it usually connects automatically.

Step 6: Access Mongo Express UI

To open the UI in your browser:

minikube service mongo-express-service -n mongo-app


This will give you a URL like http://127.0.0.1:xxxxx

Login with your credentials:

Username: mexadmin
Password: mexpass123

Step 7: Optional — check logs

If something is not working, check pod logs:

kubectl logs -n mongo-app deployment/mongo-deployment
kubectl logs -n mongo-app deployment/mongo-express-deployment