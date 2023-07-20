import { Publisher, Subjects, AuthVerifyEvent } from "@paginas/common";

export class AuthVerifyPublisher extends Publisher<AuthVerifyEvent> {
  subject: Subjects.AuthVerify = Subjects.AuthVerify;
}
