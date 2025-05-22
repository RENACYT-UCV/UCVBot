import { Alternative } from './alternative.interface';
import { Student } from './student.interface';

export interface BotResponse {
  statement: string;
  role: string;
  unixTime: number;
  idChat?: number;
  chatTitle: string;
  student: Student;
  answer?: number;
  alternatives?: Alternative[];
  answered?: boolean;
}
