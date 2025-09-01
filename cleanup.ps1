# Cleanup Kubernetes resources
Write-Host "Cleaning up Kubernetes resources..." -ForegroundColor Yellow

kubectl delete -f deployment.yaml --ignore-not-found=true
kubectl delete -f service.yaml --ignore-not-found=true
kubectl delete pod social-media-fastapi --ignore-not-found=true

# Stop and remove test container if running
docker stop social-media-test 2>$null
docker rm social-media-test 2>$null

Write-Host "✅ Cleanup completed!" -ForegroundColor Green
