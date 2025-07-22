# Dockerizing Jenkins Pipeline – DevOps Project 1
This project demonstrates **Continuous Integration (CI)** and **Continuous Delivery (CD)** using a **Dockerized Jenkins Pipeline**. The pipeline is configured to pull code from a GitHub repository and simulate the build and deploy stages.

# Objective
To set up a Jenkins server inside a Docker container and automate a pipeline for the following GitHub repository:

🔗 **Repo URL:** [html-portfolio](https://github.com/anushreedahiya/html-portfolio)

# 🛠️ Technologies Used

- Docker
- Jenkins (LTS version)
- GitHub
- Declarative Jenkins Pipeline
- PowerShell / VS Code

## Project Structure
jenkins-docker/
├── Dockerfile
├── .dockerignore (optional)
└── Jenkinsfile (optional or configured via Jenkins UI)



# Step 1: Setup Project Folder
cd "C:\Users\anush\OneDrive\Desktop\STUDYYYYYY\college\sem 7\DevOps lab"
mkdir jenkins-docker
cd jenkins-docker
code .

# Step 2: Create Dockerfile
Created a file named Dockerfile (without any extension).

Pasted the content shown above.
Dockerfile
``FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y docker.io
RUN usermod -aG docker jenkins
USER jenkins``

# Step 3: Build Jenkins Docker Image
docker build -t myjenkins .

# Step 4: Run Jenkins Container
for powershell run the below commands:-
docker run -d -p 8080:8080 -p 50000:50000 `
--name jenkins-container `
--env HTTP_PROXY= `
--env HTTPS_PROXY= `
myjenkins

or
using cmd run the below:-
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-container --env HTTP_PROXY= --env HTTPS_PROXY= myjenkins

# Step 5: Get Jenkins Admin Password
docker exec -it jenkins-container cat /var/jenkins_home/secrets/initialAdminPassword

Use the password in browser at http://localhost:8080

# Step 6: Install Jenkins Plugins
Clicked “Install Suggested Plugins”

Retried failed ones until all installed successfully

# Step 7: Create Jenkins Pipeline Job
Chose New Item > Pipeline

Selected “GitHub” project

Connected repo: https://github.com/anushreedahiya/html-portfolio

Added pipeline script (Jenkinsfile in UI or from GitHub)


