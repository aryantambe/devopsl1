pipeline {
    agent any

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
                sh 'docker build -t my-angular-app:latest .'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}