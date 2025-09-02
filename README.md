# Company Retail App

## Build and Run Locally

Build Docker image
```bash
docker build -t retail-company-app:v1 .
````

Test the app locally
```bash
docker run -d -p 8080:8080 retail-company-app:v1
````

Visit: [http://localhost:8080/products](http://localhost:8080/products)

---

## Push to DockerHub

Login to DockerHub
```bash
docker login
```

Tag the image
```bash
docker tag retail-app:v1 <dockerhub_username>/retail-company-app:v1
```

Push the image
```bash
docker push <dockerhub_username>/retail-company-app:v1
```

---

## Scan with Docker Scout

Quick image summary
```bash
docker scout quickview <dockerhub_username>/retail-company-app:v1
```

Software Bill of Materials (SBOM)
```bash
docker scout sbom <dockerhub_username>/retail-company-app:v1
```

View CVEs (vulnerabilities)
```bash
docker scout cves <dockerhub_username>/retail-company-app:v1
```

Recommendations (e.g. upgrade base image)
```bash
docker scout recommendations <dockerhub_username>/retail-company-app:v1
```

---

## Enable Docker Content Trust DCT

###  Generate a Signing Key (first time only)

Windows
```bash
$env:DOCKER_CONTENT_TRUST = "1"
```

Linux
```bash
export DOCKER_CONTENT_TRUST=1
```

Generating Key
```bash
docker trust key generate abhishekkey
```

### Sign the Image and Push

```bash
docker trust sign <dockerhub_username>/retail-company-app:v1
```

```bash
docker push <dockerhub_username>/retail-company-app:v1
```
You'll be asked to enter strong passphrases for:

* Your root key
* The repository key
* The signer key (abhishekkey)

These keys are stored securely under:
`C:\Users\<YourName>\.docker\trust\private\`

---

## Pull and Verify Signed Image on Another Machine

Enforce trust (Windows)
```bash
$env:DOCKER_CONTENT_TRUST = "1"
```

Enforce trust (Linux)
```bash
export DOCKER_CONTENT_TRUST=1
```

Pull only if image is signed
```bash
docker pull <dockerhub_username>/retail-company-app:v1
```

If the image is not signed or tampered with, the pull will **fail**.


