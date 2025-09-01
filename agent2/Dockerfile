FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y     openjdk-17-jdk     maven     git     openssh-server     && rm -rf /var/lib/apt/lists/*

# Create jenkins user with password 'jenkins' (for local demo only)
RUN useradd -m -s /bin/bash jenkins && echo "jenkins:jenkins" | chpasswd

# Prepare sshd
RUN mkdir -p /var/run/sshd &&     sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config &&     sed -i 's/UsePAM yes/UsePAM no/' /etc/ssh/sshd_config &&     sed -i 's/#PermitUserEnvironment no/PermitUserEnvironment yes/' /etc/ssh/sshd_config

EXPOSE 22

# Workdir for Jenkins agent
WORKDIR /home/jenkins
RUN chown -R jenkins:jenkins /home/jenkins

CMD ["/usr/sbin/sshd","-D","-e"]
