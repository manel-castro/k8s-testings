DEPLOYMENT

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

MISSING STUFF:

- Tune postgresql
- Tune node for multithreading (when scaling corrected)
- Finish form in front-end
- Backoffice
- TLS/SSL Docker containers / Docker security
- Deployment
- Docker swarm
- Simulating users + density of calls
