DEPLOYMENT

To start a k8s deployment: skaffold dev --wait-for-deletions=false

If problems with images: skaffold dev --no-prune=false --cache-artifacts=false

If the port on the running machine is busy: kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80

To start a development environment:

- docker-compose -f docker-compose.dev.yml up --build -V

To start a production environment:

- docker-compose up --build -V

MONITORING:

Nats streaming server: http://localhost:8222/streaming/clientsz?subs=1

NEXT:

1. Traefik config: https://medium.com/kubernetes-tutorials/deploying-traefik-as-ingress-controller-for-your-kubernetes-cluster-b03a0672ae0c
   1.a) NGINX https://docs.nginx.com/nginx-service-mesh/tutorials/kic/ingress-walkthrough/
2. Verify postgres connection with endpoints
   2.a. in case postgres complains about database run migrate through port-forward in a node instance (think how to do that in production env)
3. Finish nats connectivity

- how-to-deploy-container-using-docker-compose-to-google-cloud
  https://stackoverflow.com/questions/61157940/how-to-deploy-container-using-docker-compose-to-google-cloud

MISSING STUFF:

- Tune postgresql
- Tune node for multithreading (when scaling corrected)
- Finish form in front-end
- Backoffice
- TLS/SSL Docker containers / Docker security
- Deployment
- Docker swarm
- Simulating users + density of calls
