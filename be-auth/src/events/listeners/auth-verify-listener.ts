import { Listener, Subjects, AuthVerifyEvent } from "@paginas/common";
import { Message, Stan } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "./queueGroupName";
import { AuthVerifyPublisher } from "../publishers/auth-verify-publisher";
import { natsWrapper } from "../../nats-wrapper";
import jwt from "jsonwebtoken";

export class AuthVerifyListener extends Listener<AuthVerifyEvent> {
  subject: Subjects.AuthVerify = Subjects.AuthVerify;
  queueGroupName: string = QUEUE_GROUP_NAME;

  async onMessage(data: { type: string; msg: string }, mesg: Message) {
    console.log("received msg:", data);
    const publisher = new AuthVerifyPublisher(natsWrapper.client);

    const { type, msg } = data;
    const token = msg;

    if (!token) {
      return await publisher.publish({
        type: "error",
        msg: "Didn't received any JWT Token.",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!);
      return await publisher.publish({
        type: "response",
        msg: JSON.stringify(payload),
      });
    } catch (e) {
      return await publisher.publish({
        type: "error",
        msg: e as any,
      });
    }
  }
}
