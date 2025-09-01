pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t hello-app:latest ./app'
            }
        }

        stage('Run with Docker Compose') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo "Application deployed successfully at http://localhost:8080"
        }
        failure {
            echo "Build or Deployment failed!"
        }
    }
}
