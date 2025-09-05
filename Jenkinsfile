pipeline {
    agent { docker { image 'openjdk:17' } }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/YOUR_GITHUB_USERNAME/jenkins-docker-demo.git'
            }
        }
        stage('Build') {
            steps {
                sh 'javac HelloWorld.java'
            }
        }
        stage('Run') {
            steps {
                sh 'java HelloWorld'
            }
        }
    }
}