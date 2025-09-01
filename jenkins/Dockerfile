FROM jenkins/jenkins:lts-jdk17

# Pre-install common tools used in demos
USER root
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*
USER jenkins

# You will install plugins via the UI's "Suggested plugins" on first run.
