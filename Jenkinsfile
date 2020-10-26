pipeline {
  agent any
  stages {
    stage('Build and send initial slack message') {
      steps {
        sh 'echo Building...'
        slackSend(message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
      }
    }

    stage('Lint Dockerfile') {
      steps {
        script {
          docker.image('hadolint/hadolint:latest-debian').inside() {
            sh 'hadolint ./Dockerfile | tee -a hadolint_lint.txt'
            sh '''
lintErrors=$(stat --printf="%s"  hadolint_lint.txt)
if [ "$lintErrors" -gt "0" ]; then
echo "Errors have been found, please see below"
cat hadolint_lint.txt
exit 1
else
echo "There are no erros found on Dockerfile!!"
fi
'''
          }
        }

      }
    }

    stage('Security Scan') {
      steps {
        aquaMicroscanner(imageName: 'node:12.13.1-stretch-slim', notCompliesCmd: 'exit 1', onDisallowed: 'fail', outputFormat: 'html')
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t gallery-capstone-app .'
      }
    }

    stage('Cleaning up') {
      steps {
        echo 'Cleaning up...'
        sh 'docker system prune'
      }
    }

  }
}