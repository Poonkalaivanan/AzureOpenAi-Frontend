# AzureOpenAi-Frontend
1. Provide youe backend url in `src/Service.js`.
1. Run `npm install`
2. Run `npm start`

<br/>

# Docker Build and push
1. Run `docker build -t <YOUR_TAG> .`
2. Run `docker push <YOUR_TAG>`

 <br/>

# Kubernetes Deploy
1. Login into your cluster.
2. Change your image name in `deployment.yaml`
3. Run `kubectl apply -f deployment.yaml -n <NAMESPACE>`
