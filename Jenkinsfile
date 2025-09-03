pipeline {
    agent {
        docker { image 'node:20-bullseye' }
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
                sh 'docker build -t my-angular-app:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker stop my-angular-app || true
                    docker rm my-angular-app || true
                    docker run -d -p 8080:80 --name my-angular-app my-angular-app:latest
                '''
            }
        }
    }
}