pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'yourdockerhubusername/next-app'
    }

    stages {
        stage('Clone Repo') {
            steps {
            git branch: 'main', url: 'https://github.com/aren75/devOps-exp'
            }
        }

        stage('Install & Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'arendias', passwordVariable: '')]) {
                    bat 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    bat 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat 'docker run -d -p 3000:3000 $DOCKER_IMAGE'
            }
        }
    }
}
