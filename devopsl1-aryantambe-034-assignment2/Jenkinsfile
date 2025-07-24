pipeline {
    agent { label 'angularhello' }

    environment {
        APP_DIR = 'hello-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Pre-Build Cleanup') {
            steps {
                echo 'Pruning unused Docker resources before build...'
                sh '''
                    cd $APP_DIR

                    docker-compose down --remove-orphans --volumes || true
                                  
                    docker container prune -f || true

                    docker volume prune -f || true

                    docker image prune -f || true
                '''
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'Building and starting Docker containers...'
                sh '''
                    cd $APP_DIR
                    docker-compose build --no-cache
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            echo 'Final container status:'
            sh '''
                cd $APP_DIR
                docker-compose ps
            '''
        }
        failure {
            echo 'Deployment failed. Please check the logs above.'
        }

        success {
            echo 'Deployment successful!'
        }
    }
}