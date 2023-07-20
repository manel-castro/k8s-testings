import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("pages", randomBytes(8).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("connected to NATS");

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe("ticket:created", "listener", options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    console.log("Message received", data);
    msg.ack();
  });
});
