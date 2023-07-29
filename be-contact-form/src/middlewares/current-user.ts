import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthVerifyListener } from "../events/listeners/auth-verify-listener";
import { natsWrapper } from "../nats-wrapper";
import { AuthVerifyPublisher } from "../events/publishers/auth-verify-publisher";
import { redisClient } from "..";
import { Publisher, Subjects } from "@paginas/common";

interface UserPayload {
  id: string;
  email: string;
}

// 192 Augment Type Definitions. Min 2:45
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
// REDIS DEPLOYMENT https://www.airplane.dev/blog/deploy-redis-cluster-on-kubernetes

import nats from "node-nats-streaming";

const sc = nats.connect("paginas", "asdga", { url: "http://nats-srv:4222" });

// sc.on("connect", () => {
//   // Simple Publisher (all publishes are async in the node version of the client)
//   sc.publish("foo", "Hello node-nats-streaming!", (err, guid) => {
//     if (err) {
//       console.log("publish failed: " + err);
//     } else {
//       console.log("published message with guid: " + guid);
//     }
//   });

//   // Subscriber can specify how many existing messages to get.
//   const opts = sc.subscriptionOptions().setStartWithLastReceived();
//   const subscription = sc.subscribe("foo", opts);
//   subscription.on("message", (msg) => {
//     console.log(
//       "Received a message [" + msg.getSequence() + "] " + msg.getData()
//     );
//   });

//   // After one second, unsubscribe, when that is done, close the connection
//   setTimeout(() => {
//     subscription.unsubscribe();
//     subscription.on("unsubscribed", () => {
//       sc.close();
//     });
//   }, 1000);
// });

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("currentUser");
  console.log("Request being handled34");

  if (!req.session?.jwt) {
    return next();
  }

  // const subscriber = redisClient.duplicate();
  // await subscriber.connect();
  // console.log("Subscribed");

  // subscriber.subscribe("auth:verify:response", (message) => {
  //   console.log("message:", message);

  //   const { type, msg } = JSON.parse(message);

  //   if (type === "error") {
  //     return next();
  //   }

  //   console.log("msg; ", msg);
  //   req.currentUser = msg;
  //   return next();
  // });

  // const publisher = redisClient.duplicate();
  // await publisher.connect();
  // await publisher.publish(
  //   "auth:verify:check",
  //   JSON.stringify({ jwt: req.session.jwt })
  // );

  // next();
  // try {
  //   const payload = jwt.verify(
  //     req.session.jwt,
  //     process.env.JWT_KEY!
  //   ) as UserPayload;
  //   req.currentUser = payload;
  // } catch (e) {}

  new AuthVerifyListener(natsWrapper.client, (data) => {
    const { type, msg } = data;
    if (type === "error") {
      return next();
    }
    const message = msg;

    console.log("validated");
    // req.currentUser = { email: "payload", id: "asdf" };
    try {
      const payload = JSON.parse(message);
      req.currentUser = payload;

      next();
    } catch (error) {
      next();
    }
  }).listen();

  // natsWrapper.client.publish(
  //   Subjects.AuthVerify,
  //   JSON.stringify({ jwt: req.session.jwt }),
  //   (err, guid) => {
  //     if (err) {
  //       console.log("publish failed: " + err);
  //     } else {
  //       console.log("published message with guid: " + guid);
  //     }
  //   }
  // );
  const publisher = new AuthVerifyPublisher(natsWrapper.client);
  await publisher.publish({ type: "request", msg: req.session.jwt });

  console.log("published");

  // sendMessage(JSON.stringify({ jwt: req.session.jwt }));
};
