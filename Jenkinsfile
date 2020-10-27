pipeline {
  agent any
  stages {
    stage('Lint Dockerfile') {
      steps {
          echo 'linting Dockerfile'
          sh 'docker run --rm -i hadolint/hadolint < Dockerfile'
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
        sh 'docker system prune -f'
      }
    }

  }
}