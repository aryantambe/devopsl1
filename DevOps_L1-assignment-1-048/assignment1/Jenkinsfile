pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/heet2604/SimonGame', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'No dependencies to install for a static HTML/JS project.'
            }
        }

        stage('Test') {
            steps {
                echo 'No automated tests are configured.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the app... (add your deployment logic here)'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
