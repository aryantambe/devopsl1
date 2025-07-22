pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Atharva-Gondhali/Docker-jenkins-demo.git'
            }
        }

        stage('Install Dependencies') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t jenkins-demo-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name jenkins-demo-app jenkins-demo-app'
            }
        }
    }
}
