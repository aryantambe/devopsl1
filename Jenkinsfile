pipeline {
  agent none
  options {
    timestamps()
  }
  stages {
    stage('Prepare Workspace') {
      agent { label 'agent1' } // run on agent1 just to stage files
      steps {
        echo "Copying project from shared /repo into workspace..."
        sh '''
          rm -rf *
          cp -r /repo/maven-project ./maven-project
        '''
        stash name: 'src', includes: 'maven-project/**'
      }
    }

    stage('Compile on agent1') {
      agent { label 'agent1' }
      steps {
        unstash 'src'
        sh 'mvn -B -f maven-project/pom.xml clean compile'
      }
      post {
        always {
          archiveArtifacts artifacts: 'maven-project/target/**/*.class', fingerprint: true, onlyIfSuccessful: false
        }
      }
    }

    stage('Test on agent2') {
      agent { label 'agent2' }
      steps {
        unstash 'src'
        sh 'mvn -B -f maven-project/pom.xml test'
        junit 'maven-project/target/surefire-reports/*.xml'
      }
      post {
        success {
          echo 'Tests passed on agent2 ✅'
        }
      }
    }
  }
}
