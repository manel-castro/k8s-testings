import { consume, sendMessage } from "../rabbitMq";
import jwt from "jsonwebtoken";

import { UserPayload } from "../types/jwt";

export const CheckUser = async () => {
  return consume(undefined, async (message: Buffer) => {
    const messageObj = JSON.parse(message.toString());

    const { jwt: jwtToken } = messageObj;
    console.log("messageObj: ", messageObj);
    console.log("jwt: ", jwtToken);
    console.log("process.env.JWT_KEY: ", process.env.JWT_KEY);

    if (!jwtToken) {
      return await sendMessage("bad message");
    }
    // console.log("jwt: ", jwt);
    try {
      const payload = jwt.verify(jwtToken, process.env.JWT_KEY!) as UserPayload;
      console.log("payload: ", payload);

      return await sendMessage(JSON.stringify(payload));
    } catch (e) {
      return await sendMessage("jwt failed to verify");
    }
  });
};
