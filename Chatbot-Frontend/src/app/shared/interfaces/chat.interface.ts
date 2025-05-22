import { Message } from './message.interface';

export interface Chat {
  id?: number;
  title: string;
  userUID: string;
  userName: string;
  messages: Message[];
}
