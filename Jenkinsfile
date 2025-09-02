pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-repo/angular-docker-app.git', branch: 'main'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'docker build -t angular-docker-app .'
            }
        }

        stage('Run with Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }

        stage('Test') {
            steps {
                sh 'curl -I http://localhost:4200'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down'
        }
    }
}
