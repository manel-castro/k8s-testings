import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "payments-service";

  onMessage(
    data: { id: string; title: string; price: number },
    msg: Message
  ): void {
    console.log("Event data!: ", data.id);
    console.log("Event data!: ", data.price);
    console.log("Event data!: ", data.title);

    msg.ack();
  }
}
