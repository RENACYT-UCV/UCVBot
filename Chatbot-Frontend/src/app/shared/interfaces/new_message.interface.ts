import { Student } from './student.interface';

export interface NewMessage {
  statement: string;
  role: string;
  unixTime: number;
  student: Student;
}
