import { Alternative } from './alternative.interface';

export interface Exercise {
  alternatives: Alternative[];
  answer: number;
  statement: string;
}
