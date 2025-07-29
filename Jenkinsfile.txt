pipeline {
  agent any

  environment {
    IMAGE_NAME = 'serdunk/devops-1'
  }

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/SerDunk/devops-lab-1-assignment-1'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("$IMAGE_NAME")
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
          script {
            docker.image("$IMAGE_NAME").push()
          }
        }
      }
    }
  }
}
