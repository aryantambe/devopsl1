pipeline {
    agent any
    stages {
        stage('Parallel Build') {
            parallel {
                stage('Compile Code') {
                    steps {
                        echo "Compiling login module for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
                stage('Run Unit Tests') {
                    steps {
                        echo "Running tests for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
                stage('Security Scan') {
                    steps {
                        echo "Scanning code for ${env.BRANCH_NAME}"
                        sleep 3
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ${env.BRANCH_NAME} branch"
                sleep 2
                echo "Deployment done!"
            }
        }
    }
}
