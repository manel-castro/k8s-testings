import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthVerifyListener } from "../events/listeners/auth-verify-listener";
import { natsWrapper } from "../nats-wrapper";
import { AuthVerifyPublisher } from "../events/publishers/auth-verify-publisher";

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
  // next();
  // try {
  //   const payload = jwt.verify(
  //     req.session.jwt,
  //     process.env.JWT_KEY!
  //   ) as UserPayload;
  //   req.currentUser = payload;
  // } catch (e) {}

  new AuthVerifyListener(natsWrapper.client, ({ jwt }) => {
    const message = jwt;

    console.log("validated");
    req.currentUser = { email: "payload", id: "asdf" };
    try {
      const payload = JSON.parse(message);
      req.currentUser = payload;

      next();
    } catch (error) {
      next();
    }
  }).listen();
  const publisher = new AuthVerifyPublisher(natsWrapper.client);

  await publisher.publish({ jwt: req.session.jwt });

  // sendMessage(JSON.stringify({ jwt: req.session.jwt }));
};
