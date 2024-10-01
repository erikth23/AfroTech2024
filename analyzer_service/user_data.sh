#!/bin/bash -x
sudo yum update -y
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 975050337547.dkr.ecr.us-west-2.amazonaws.com
docker pull 975050337547.dkr.ecr.us-west-2.amazonaws.com/sorting_hat_service:1.0
docker run -d -p 80:3000 -e AWS_ACCESS_KEY=$AWS_ACCESS_KEY -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e OPENAI_API_KEY=$OPENAI_API_KEY  975050337547.dkr.ecr.us-west-2.amazonaws.com/sorting_hat_service:1.0
