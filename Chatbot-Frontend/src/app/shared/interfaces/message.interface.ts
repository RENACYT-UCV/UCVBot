import { Alternative } from './alternative.interface';

export interface Message {
  id?: number;
  statement: string;
  role: string;
  unixTime: number;
  answer?: number;
  alternatives?: Alternative[];
  answered?: boolean;
}
