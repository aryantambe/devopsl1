pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aryan-bhoi/Portfolio.git'
            }
        }

        stage('Build') {
            steps {
                echo "Simulating build..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Simulating deployment..."
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Open http://localhost:8080 to view the app."
        }
    }
}