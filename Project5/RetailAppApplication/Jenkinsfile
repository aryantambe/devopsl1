pipeline {
  agent any
  options { timestamps() }

  environment {
    IMAGE_NAME   = "yourdockerhubusername/retail-app"
    IMAGE_TAG    = "build-${env.BUILD_NUMBER}"
    FULL_IMAGE   = "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build & Test (Maven)') {
      steps {
        sh """
          # build using Docker's maven (clean environment)
          docker run --rm -v "\$PWD":/app -w /app \
            eclipse-temurin:21-jdk-alpine sh -c '
              apk add --no-cache maven &&
              mvn -B -q test &&
              mvn -B -q package -DskipTests
            '
        """
      }
      post {
        always { junit 'target/surefire-reports/*.xml' }
        success { archiveArtifacts artifacts: 'target/*.jar', fingerprint: true }
      }
    }

    stage('Docker Build') {
      steps {
        sh "docker build -t ${FULL_IMAGE} ."
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                          usernameVariable: 'DOCKER_USER',
                                          passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push ${FULL_IMAGE}
            docker tag ${FULL_IMAGE} ${IMAGE_NAME}:latest
            docker push ${IMAGE_NAME}:latest
          """
        }
      }
    }

    stage('Security Scan (Trivy)') {
      steps {
        sh """
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy:latest image --no-progress \
            --severity HIGH,CRITICAL --exit-code 1 ${FULL_IMAGE}
        """
      }
    }
  }

  post {
    success { echo "Built, pushed, and scanned: ${FULL_IMAGE}" }
    failure { echo "Build failed – check logs." }
  }
}
