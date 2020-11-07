/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    environment {
        APP_NAME = 'gallery-capstone-app'
        AWS_ACCOUNT = '575711874019'
        REGION = 'us-west-2'
        REACT_APP_API_KEY = credentials('REACT_APP_API_KEY')
        npm_config_cache = 'npm-cache'
    }


    stages {

        stage('Lint Dockerfile') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    docker.image('hadolint/hadolint:latest-debian').inside {
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

        // stage('Build Docker Image') {
        //     steps {
        //         sh "docker build -t $APP_NAME . --build-arg REACT_APP_API_KEY=$REACT_APP_API_KEY"
        //     }
        // }

        // stage('Push Docker Image') {
        //     steps {
        //         withDockerRegistry([url: '', credentialsId: 'DockerHubID']) {
        //             sh "docker tag $APP_NAME:latest sadrayan/$APP_NAME:latest"
        //             sh "docker push sadrayan/$APP_NAME:latest"
        //         }
        //     }
        // }

        stage('Deploying') {
            steps {
                echo 'Deploying to AWS...'
                withAWS(credentials: 'aws-credentials') {
                    sh 'cd kubernetes'
                    sh "aws eks update-kubeconfig --name capstone-gallery-cluster --region $REGION"
                    /* groovylint-disable-next-line LineLength */
                    sh "kubectl config use-context arn:aws:eks:$REGION:$AWS_ACCOUNT:cluster/capstone-gallery-cluster"
                    sh 'kubectl apply -f app-deployment.yml'
                    sh 'kubectl get nodes'
                    sh 'kubectl get deployments'
                    sh 'kubectl get pod -o wide'
                    sh "kubectl get service/$APP_NAME"
                }
            }
        }

        stage('Checking rollout') {
              steps{
                  echo 'Checking rollout...'
                  /* groovylint-disable-next-line DuplicateStringLiteral */
                  withAWS(credentials: 'aws-credentials', region: 'us-west-2') {
                     sh "kubectl rollout status deployments/$APP_NAME"
                  }
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
