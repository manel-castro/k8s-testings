import { Subjects } from "./subjects";

export interface AuthVerifyEvent {
  subject: Subjects.AuthVerify;
  data: {
    jwt: string;
  };
}
