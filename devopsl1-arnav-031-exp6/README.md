# Docker

docker build -t social-media:latest .

# DockerHub

docker tag social-media:latest aaryandhawan/social-media:latest

docker push aaryandhawan/social-media:latest


# MINIKUBE

#### Install
choco install minikube


#### Commands

minikube start --driver=docker --no-vtx-check

minikube dashboard

minikube addons enable metrics-server
kubectl get deployment metrics-server -n kube-system

kubectl get pods -A

kubectl get pods

kubectl delete pod pod_name


## Deployment.yaml 

kubectl apply -f deployment.yaml

kubectl get deployments

## Service.yaml 

kubectl apply -f service.yaml

kubectl get service


#### To access it via browser:
minikube service service_name


## HPA

kubectl autoscale deployment social-media-deployment ^
  --cpu-percent=50 ^
  --min=1 ^
  --max=5

kubectl get hpa

kubectl delete hpa social-media-deployment

kubectl run -i --tty load-generator --rm ^
  --image=busybox ^
  -- /bin/sh

while true; do wget -q -O- http://social-media-service:8000; done

kubectl get hpa -w

kubectl get pods