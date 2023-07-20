import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("pages", randomBytes(8).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

/**
 * GRACEFUL SHUTDOWN
 */
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
