1. [Prerequisites](#prerequisites)
2. [Build and Run Locally](#build-and-run-locally)
3. [Push to DockerHub](#push-to-dockerhub)
4. [Scan with Docker Scout](#scan-with-docker-scout)
5. [Enable Docker Content Trust DCT](#enable-docker-content-trust-dct)
6. [Pull and Verify Signed Image on Another Machine](#pull-and-verify-signed-image-on-another-machine)
6. [Summary](#summary)
7. [Credits](#credits)
8. [Authors](#authors)


## Prerequisites

- Docker installed
- Maven installed
- DockerHub account
- Docker Scout CLI (`docker scout version`)
- (Optional) Two machines or terminals to test trust enforcement

---

## Build and Run Locally

Clone the Repo
```bash
git clone https://github.com/dhruv-dosh/ImageVerification
````

Change directory
```bash
cd retail-app
````

Build the Spring Boot JAR
```bash
mvn clean install
````

Build Docker image
```bash
docker build -t ImageVerification:v1 .
````

Test the app locally
```bash
docker run -d -p 8080:8080 ImageVerification:v1
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
docker tag ImageVerification:v1 <dockerhub_username>/ImageVerification:v1
```

Push the image
```bash
docker push <dockerhub_username>/retail-app:v1
```

---

## Enable Docker Content Trust DCT

### 1️⃣ Generate a Signing Key (first time only)

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
docker trust key generate KeyName
```

### 2️⃣ Sign the Image and Push

```bash
docker trust sign <dockerhub_username>/ImageVerification:v1
```

```bash
docker push <dockerhub_username>/ImageVerification:v1
```
🔑 You'll be asked to enter strong passphrases for:

* Your root key
* The repository key
* The signer key (keyName)

📝 These keys are stored securely under:
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
docker pull <dockerhub_username>/retail-app:v1
```

✅ If the image is not signed or tampered with, the pull will **fail**.

---

## Summary

| Feature                     | Status      |
| --------------------------- | ----------- |
| Spring Boot App             | ✅ Completed |
| Dockerized                  | ✅ Completed |
| Scanned with Scout          | ✅ Completed |
| Signed with DCT             | ✅ Completed |
| Verified on another machine | ✅ Completed |

---

## Credits

* Docker Scout - [https://docs.docker.com/scout/](https://docs.docker.com/scout/)
* Docker Content Trust - [https://docs.docker.com/engine/security/trust/](https://docs.docker.com/engine/security/trust/)

---

