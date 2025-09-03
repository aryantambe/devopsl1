pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-angular-app"
        DOCKERHUB_USER = "your-dockerhub-username"   // 🔑 change this
        DOCKERHUB_CREDENTIALS = "dockerhub-creds"    // Jenkins Credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'aryanbhoi-033-assignment2',
                    url: 'https://github.com/aryantambe/devopsl1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKERHUB_USER/$IMAGE_NAME:latest ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh "docker push $DOCKERHUB_USER/$IMAGE_NAME:latest"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}