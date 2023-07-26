import { Listener, Subjects, AuthVerifyEvent } from "@paginas/common";
import { Message, Stan } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "./queueGroupName";

type OnCallbackMessage = (res: { jwt: string }) => void;

export class AuthVerifyListener extends Listener<AuthVerifyEvent> {
  subject: Subjects.AuthVerify = Subjects.AuthVerify;
  queueGroupName: string = QUEUE_GROUP_NAME;

  constructor(client: Stan, private onCallbackMessage: OnCallbackMessage) {
    super(client);
  }
  onMessage(data: { jwt: string }, msg: Message): void {
    this.onCallbackMessage(data);
  }
}
