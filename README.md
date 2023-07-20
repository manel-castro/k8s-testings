DEPLOYMENT

To start a development environment:

- docker-compose -f docker-compose.dev.yml up --build -V

To start a production environment:

- docker-compose up --build -V

MONITORING:

Nats streaming server: http://localhost:8222/streaming/clientsz?subs=1

MISSING STUFF:

- Tune postgresql
- Tune node for multithreading (when scaling corrected)
- Finish form in front-end
- Backoffice
- TLS/SSL Docker containers / Docker security
- Deployment
- Docker swarm
- Simulating users + density of calls
