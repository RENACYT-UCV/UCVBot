import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Exercise } from 'src/app/shared/interfaces/exercise.interface';
import { SERVER_NAME } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private ENDPOINT_URL: string = SERVER_NAME + '/exercises';

  private ejerciciosSubject: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  public ejercicios$: Observable<Exercise[]> = this.ejerciciosSubject.asObservable();

  constructor(private http: HttpClient) { }

  getExercise(name: string): Observable<Exercise[]> {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName === 'avanzado') {
      return this.http.get<Exercise[]>(`${this.ENDPOINT_URL}/advanced`);
    } else if (lowerCaseName === 'intermedio') {
      return this.http.get<Exercise[]>(`${this.ENDPOINT_URL}/intermediate`);
    } else {
      return this.http.get<Exercise[]>(`${this.ENDPOINT_URL}/basic`);
    }
  }

  setEjercicios(exercises: Exercise[]): void {
    this.ejerciciosSubject.next(exercises);
  }
}
