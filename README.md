# Project 9: Create apache2 server within a deployment and access it using host machine using commands learn using K8s

### Create the  Apache Deployment
```
kubectl create deployment apache-deployment --image=httpd
```

### Get the Pods
```
kubectl get pods
```

### Expose the Deployment with a Service
```
kubectl expose deployment apache-deployment --type=NodePort --port=80
```

### Access Your Apache Server using browser
```
minikube service apache-deployment --url
```

### Delete the Service
```
kubectl delete service apache-deployment
```

### Delete the Deployment
```
kubectl delete deployment apache-deployment
```
## Author
- Abhishek Rajput
