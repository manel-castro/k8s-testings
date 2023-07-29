import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthVerifyListener } from "../events/listeners/auth-verify-listener";
import { natsWrapper } from "../nats-wrapper";
import { AuthVerifyPublisher } from "../events/publishers/auth-verify-publisher";
import { redisClient } from "..";
import { Subjects } from "@paginas/common";

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

  // new AuthVerifyListener(natsWrapper.client, ({ jwt }) => {
  //   const message = jwt;

  //   console.log("validated");
  //   req.currentUser = { email: "payload", id: "asdf" };
  //   try {
  //     const payload = JSON.parse(message);
  //     req.currentUser = payload;

  //     next();
  //   } catch (error) {
  //     next();
  //   }
  // }).listen();
  natsWrapper.client.addListener(Subjects.AuthVerify, (msg) =>
    console.log("MESSAGE:", msg)
  );
  console.log("publishing");

  const publisher = new AuthVerifyPublisher(natsWrapper.client);
  console.log("publisher created");

  natsWrapper.client.publish(
    Subjects.AuthVerify,
    JSON.stringify({ jwt: req.session.jwt })
  );
  // await publisher.publish({ jwt: req.session.jwt });
  console.log("published");

  // sendMessage(JSON.stringify({ jwt: req.session.jwt }));
};
