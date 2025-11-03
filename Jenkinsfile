pipeline {
    agent any
    stages {
        stage('Parallel Build') {
            parallel {
                stage('Build Payment Service') {
                    steps {
                        echo "Building payment module for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
                stage('Run Payment Tests') {
                    steps {
                        echo "Running payment tests for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
                stage('Code Quality Check') {
                    steps {
                        echo "Checking code quality for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ${env.BRANCH_NAME} branch"
                sleep 2
                echo "Deployment complete!"
            }
        }
    }
}
