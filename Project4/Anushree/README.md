# Project4: Jenkins CI/CD with Docker

## Overview
This project demonstrates a CI/CD pipeline using **Jenkins** inside Docker. It includes:

- Jenkins Master container
- Jenkins Slave/Agent containers
- Integration with a GitHub repository for automated builds
- Persistent Jenkins data using Docker volumes
- Optional Pipeline setup for automated CI/CD workflows

## Prerequisites
- Docker installed on your system
- Basic knowledge of Git, Jenkins, and Docker
- GitHub repository containing your project code

## Setup Instructions

### 1. Start Jenkins Master
Run Jenkins master with persistent storage:
```powershell
docker run -d --name jenkins-master `
  -p 8081:8080 -p 50000:50000 `
  -v jenkins_home:/var/jenkins_home `
  jenkins/jenkins:lts


Access Jenkins UI at: http://localhost:8081
Get the initial admin password:
docker exec jenkins-master cat /var/jenkins_home/secrets/initialAdminPassword

### 2. Start Jenkins Agents (Optional)
Create agents for distributed builds:
docker run -d --name jenkins-slave1 `
  -e JENKINS_URL=http://host.docker.internal:8081 `
  -e JENKINS_AGENT_NAME=slave1 `
  -e JENKINS_AGENT_WORKDIR=/home/jenkins/agent `
  jenkins/inbound-agent


Repeat for slave2 or more agents.

### 3. Create a Jenkins Job
Open Jenkins → Click New Item
Choose Freestyle project or Pipeline
Configure the job:
Source Code Management: GitHub repo
Build Steps: Maven, Gradle, or Docker commands
Post-build Actions: Deploy artifacts, run tests, notifications

### 4. Configure Nodes/Agents
Go to Manage Jenkins → Manage Nodes and Clouds
Ensure agents (slave1, slave2) are connected
Assign builds to run on specific agents if needed

### 5. Run a Build
Click Build Now
Monitor console output for success/failure
Fix any errors and retry

### 6. Optional: Pipeline Setup
Add a Jenkinsfile in your repo for automated CI/CD:

pipeline {
    agent any
    stages {
        stage('Clone') {
            steps { git 'https://github.com/anushreedahiya/DevOps-Lab' }
        }
        stage('Build') {
            steps { sh 'mvn clean package' }
        }
        stage('Test') {
            steps { sh 'mvn test' }
        }
        stage('Docker Build & Deploy') {
            steps { sh 'docker build -t myapp:latest .' }
        }
    }
}


Configure Jenkins job to use Pipeline from SCM.

7. Persist Jenkins Data

All jobs, credentials, and configuration are stored in Docker volume jenkins_home. Rebuilding the container does not lose your setup.

Troubleshooting:-
Port issues: Ensure port 8080 is free or map to another port (-p 8081:8080)
Initial Admin Password missing: Recreate Jenkins container with a fresh volume
Git errors: Verify branch names and GitHub repo access

Author
Anushree Dahiya