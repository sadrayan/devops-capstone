pipeline {
  agent any
  stages {
    // stage('Lint Dockerfile') {
    //   steps {
    //     script {
    //       docker.image('hadolint/hadolint:latest-debian').inside() {
    //         sh 'hadolint ./Dockerfile | tee -a hadolint_lint.txt'
    //         sh '''
    //         lintErrors=$(stat --printf="%s"  hadolint_lint.txt)
    //         if [ "$lintErrors" -gt "0" ]; then
    //         echo "Errors have been found, please see below"
    //         cat hadolint_lint.txt
    //         exit 1
    //         else
    //         echo "There are no erros found on Dockerfile!!"
    //         fi
    //         '''
    //       }
    //     }
    //   }
    // }
    stage('check user ') {
      steps {
        sh 'w'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'sudo docker build -t gallery-capstone-app .'
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