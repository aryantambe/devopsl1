FROM jenkins/jenkins:lts

USER root

# Install Docker inside the Jenkins container
RUN apt-get update && \
    apt-get install -y docker.io && \
    usermod -aG docker jenkins

USER jenkins
