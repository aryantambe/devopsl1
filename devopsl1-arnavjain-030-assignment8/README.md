# Project 8: Create deployments ,services,configmaps and secrets to containerize a complete application with at least 4 microservice
## 1. Build images locally and push to registry (from project root):

```
docker build --no-cache -t arnavjain2503/users:1.0 ./users
docker push arnavjain2503/users:1.0

docker build --no-cache -t arnavjain2503/posts:1.0 ./posts
docker push arnavjain2503/posts:1.0

docker build --no-cache -t arnavjain2503/api-gateway:1.0 ./api-gateway
docker push arnavjain2503/api-gateway:1.0

docker build --no-cache -t arnavjain2503/frontend:1.0 ./frontend
docker push arnavjain2503/frontend:1.0
```

## 2. Update images in K8s manifests (your-registry/...) to your pushed image names.

## 3. Apply manifests:

```
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml -n microapp
kubectl apply -f k8s/secret.yaml -n microapp
kubectl apply -R -f k8s/deployments -n microapp
kubectl apply -R -f k8s/services -n microapp
```

## 4. On Minikube, access frontend:
```
minikube service frontend-svc -n microapp
```

## 5. Other
#### Restart the Kubernetes Deployment
```
kubectl rollout restart deployment frontend-deploy -n microapp
```

##### Verify the Rollout
```
kubectl rollout status deployment/frontend-deploy -n microapp
```

## Author
- Arnav Jain
