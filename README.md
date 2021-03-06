## Simple React Gallery App
The [React Gallery App](https://github.com/renatognunes/react-gallery-app) is simple web app that can search and display photo gallery, powered by [Unsplash API](https://unsplash.com/developers). 

### Runnig App (locally)
Sign up at [Unsplash API](https://unsplash.com/developers) and add it to .env file.

`REACT_APP_API_KEY=<YOUR_API_KEY>`

then run: 

`npm install`

`npm start`

![GalleryApp](Gallery-React-App.png)


## Run in docker (locally)
1- `run_docker.sh` will build and run the application in Docker. The application is first intalled and tested in node docker, and served from nginx server.

`./run_docker.sh`

2- Test application 

    - http://localhost/

    - curl -s http://localhost (curl option)

3- Check the Docker logs for debug

`docker logs -f gallery-capstone-app`

4- Stop Docker container

`docker stop gallery-capstone-app`

### Tag and Upload Docker images to DockerHub
1- update `upload_docker.sh` with your Dockerhub account information, and run:

`./upload_docker.sh`


# Setup Jenkins for CI/CD
The Jenkins CI/CD is hosted on AWS EC2. In infrastructure folder, you will find the guides to build your VPC and deployed Jenkins host to AWS.

### Install plugins
Install the following plugins (Go to Manage Jenkins > Manage Plugins > Available): 

- blue ocean plugin for easy deployment of pipelines, the Pipeline: 

- AWS steps plugin to add Jenkins pipeline steps to interact with the AWS API. 

### Setup credentials
Set up following credentials (Go to Manage Jenkins > Manage Credentials):
 - AWS user credentials (Access ID and secret access key)
 - Dockerhub credentials (for pulling the image from dockerhub) 

### Setup environment variables:
Set up environment variables for the build (Unsplash API key)

![jenkins-credentials](jenkins-credentials.png)


### Follow this if you need to give access to your jenkins AWS account
https://stackoverflow.com/questions/59987859/kubectl-error-you-must-be-logged-in-to-the-server-unauthorized
https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html
    
`
    - userarn: arn:aws:iam::575711874019:user/jenkins-capstone
    username: jenkins-capstone
    groups:
    - system:masters
`
- AWS AIM user
    name jenkins-capstone



## Create an AWS Elastic Kubernetes Service Cluster
eksctl tool will create an EKS cluster and will deploy:
 - 3 nodegroup workers of type (t2.medium)
 - autoscaling group with minimum 1 node and maximum of 4 nodes. 
 - VPC, the public and the private subnets, the internet gateway and the route table

Create cluster with eksctl:
- `eksctl create cluster --name capstone-gallery-app --version 1.18 --nodegroup-name standard-workers --node-type t2.small --nodes 3 --nodes-min 1 --nodes-max 4 --node-ami auto --region us-west-2`

View all availeble clusters:
- `aws eks list-clusters --region=us-west-2 --output=text`

To delete the cluster (cleanup): 
- `eksctl delete cluster --name capstone-gallery-app`

List all services running in your cluster.
- `kubectl get svc --all-namespaces`

Delete services
- `kubectl delete svc <service-name>`

## Kubkuberneteser
kubernetes deployment from the docker image:
- Load balancer service (with an external IP) which operates on the three worker nodes
- Deploy the app-deployment.yaml file

Update eks with kubernetes cluster name

`aws eks update-kubeconfig --name capstone-gallery-app --region us-west-2`

Update kubectl with cluster ARN

`kubectl config use-context arn:aws:eks:us-west-2:575711874019:cluster/capstone-gallery-app`

Deploy app to kubenetes:

`kubectl apply -f kubernetes/app-deployment.yml`

- `kubectl get nodes`
- `kubectl get deployments`
- `kubectl get pod -o wide`
- `kubectl get service/$APP_NAME`

Fingers crossed, the application will be deployed to the kubernetes mananged cluster, with load balancer address to acces the application

http://ab48dfe66e1614cff9a4d89c1fce379f-1105169351.us-west-2.elb.amazonaws.com/