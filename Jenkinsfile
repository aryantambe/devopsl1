pipeline {
    agent any
    stages {
        stage('Parallel Build Stages') {
            parallel {
                stage('Build') {
                    steps {
                        echo "Building the ${env.BRANCH_NAME} branch..."
                        bat 'echo Simulating build process for login module'
                    }
                }
                stage('Test') {
                    steps {
                        echo "Testing the ${env.BRANCH_NAME} branch..."
                        bat 'echo Running unit tests for login module'
                    }
                }
                stage('Deploy') {
                    steps {
                        echo "Deploying the ${env.BRANCH_NAME} branch..."
                        bat 'echo Deploying login service'
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Pipeline completed for branch: ${env.BRANCH_NAME}"
        }
    }
}
