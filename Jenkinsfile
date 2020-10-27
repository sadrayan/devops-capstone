pipeline {
    agent any

    environment {
        APP_NAME = 'gallery-capstone-app'
        AWS_ACCOUNT = '915323986442'
        REACT_APP_API_KEY = '$REACT_APP_API_KEY'
    }

    stages {
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

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $APP_NAME . --build-arg REACT_APP_API_KEY=$REACT_APP_API_KEY'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([url: '', credentialsId: 'DockerHubID']) {
                    sh "docker tag $APP_NAME:latest sadrayan/$APP_NAME:latest"
                    sh 'docker push sadrayan/$APP_NAME:latest'
                }
            }
        }

        post {
            always {
                echo 'Cleaning up...'
                sh 'docker system prune -f'
            }
        }

    }
}
