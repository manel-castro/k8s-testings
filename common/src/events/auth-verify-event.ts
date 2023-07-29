import { Subjects } from "./subjects";

export interface AuthVerifyEvent {
  subject: Subjects.AuthVerify;
  data: {
    type: string;
    msg: string;
  };
}
