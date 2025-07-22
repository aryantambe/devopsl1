FROM jenkins/jenkins:lts-jdk17

USER root

# Install Docker CLI
RUN apt-get update && apt-get install -y docker.io coreutils && apt-get clean

# Add Jenkins user to root group (GID 0) so it can access Docker socket
RUN usermod -aG root jenkins

USER jenkins
