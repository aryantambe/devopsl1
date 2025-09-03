pipeline {
    agent any

    tools {
        nodejs "NodeJS-24"   // Your configured NodeJS tool name
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
                dir('Project2/my-angular-app') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir('Project2/my-angular-app') {
                    sh 'npm run build --prod'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('Project2/my-angular-app') {
                    sh 'docker build -t my-angular-app:latest .'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                dir('Project2/my-angular-app') {
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
}