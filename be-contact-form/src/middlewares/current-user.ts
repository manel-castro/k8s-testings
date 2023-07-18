import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { consume, sendMessage } from "../rabbitMq";

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

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("currentUser");

  if (!req.session?.jwt) {
    return next();
  }

  // try {
  //   const payload = jwt.verify(
  //     req.session.jwt,
  //     process.env.JWT_KEY!
  //   ) as UserPayload;
  //   req.currentUser = payload;
  // } catch (e) {}

  consume("current-user", (buffMess, channel) => {
    const message = buffMess.toString();

    try {
      const payload = JSON.parse(message);
      req.currentUser = payload;

      channel.cancel("current-user");
      next();
    } catch (error) {}
  });

  sendMessage(JSON.stringify({ jwt: req.session.jwt }));
};
