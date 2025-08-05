pipeline {
    agent any

    tools {
        maven 'Maven 3.9'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling source code...'
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building project...'
                withMaven(maven: 'Maven 3.9') {
                    bat 'mvn clean package'
                }
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t demo-app .'
            }
        }
        stage('Docker Run') {
            steps {
                echo 'Running Docker container...'
                bat 'docker run --rm demo-app'
            }
        }
    }
}
