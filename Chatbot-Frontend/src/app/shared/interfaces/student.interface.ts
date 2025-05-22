import { Level } from './level.interface';

export interface Student {
  userUID?: string;
  userName?: string;
  email?: string;
  photoURL?: string;
  level?: Level;
  correctExercises?: number;
  incorrectExercises?: number;
  score?: number;
  // status 500
  status?: number;
}
