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

## Tag and Upload Docker images to DockerHub
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



- AWS AIM user
    name jenkins-capstone
    - "ec2:*"
    - "s3:*"
    - "cloudformation:*"


## Create an AWS Elastic Kubernetes Service Cluster
eksctl tool will create an EKS cluster and will deploy:
 - 3 nodegroup workers of type (t2.medium)
 - autoscaling group with minimum 1 node and maximum of 4 nodes. 
 - VPC, the public and the private subnets, the internet gateway and the route table

`eksctl create cluster --name capstone-gallery-cluster --version 1.16 --nodegroup-name standard-workers --node-type t2.small --nodes 3 --nodes-min 1 --nodes-max 4 --node-ami auto --region us-west-2`