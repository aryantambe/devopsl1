pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        dir('my-angular-app') {
          sh 'npm install'
        }
      }
    }

    stage('Build Angular App') {
      steps {
        dir('my-angular-app') {
          sh 'npm run build --prod'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t my-angular-app ./my-angular-app'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker run -d -p 4200:80 --name my-angular-app-container my-angular-app || true'
      }
    }
  }
}
