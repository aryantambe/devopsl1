# Deploy to Kubernetes
Write-Host "Deploying to Kubernetes..." -ForegroundColor Green

# Check if kubectl is available
try {
    kubectl version --client --output=yaml | Out-Null
} catch {
    Write-Host "❌ kubectl is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Apply Kubernetes configurations
Write-Host "Applying deployment..." -ForegroundColor Yellow
kubectl apply -f deployment.yaml

Write-Host "Applying service..." -ForegroundColor Yellow
kubectl apply -f service.yaml

# Check deployment status
Write-Host "`nChecking deployment status..." -ForegroundColor Cyan
kubectl get deployments
kubectl get pods
kubectl get services

Write-Host "`n✅ Deployment completed!" -ForegroundColor Green
Write-Host "📋 To check the status:" -ForegroundColor Cyan
Write-Host "   kubectl get pods" -ForegroundColor White
Write-Host "   kubectl get services" -ForegroundColor White
Write-Host "   kubectl logs -f deployment/social-media-deployment" -ForegroundColor White

Write-Host "`n🌐 To access the application:" -ForegroundColor Cyan
$serviceType = kubectl get service social-media-service -o jsonpath='{.spec.type}'
if ($serviceType -eq "LoadBalancer") {
    Write-Host "   kubectl get service social-media-service (check EXTERNAL-IP)" -ForegroundColor White
    Write-Host "   Or use port-forward: kubectl port-forward service/social-media-service 8000:8000" -ForegroundColor White
} else {
    Write-Host "   kubectl port-forward service/social-media-service 8000:8000" -ForegroundColor White
}

Write-Host "`n🔄 To update the deployment:" -ForegroundColor Cyan
Write-Host "   kubectl rollout restart deployment/social-media-deployment" -ForegroundColor White
