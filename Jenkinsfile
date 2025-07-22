pipeline {
  agent any

  stages {
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t simple-html-app .'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker run -d -p 8081:80 --name simple-html-app-container simple-html-app || true'
      }
    }
  }
}
