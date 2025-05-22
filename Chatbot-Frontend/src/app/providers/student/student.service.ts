import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { SERVER_NAME } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private ENDPOINT_URL: string = SERVER_NAME + '/students';


  public level!: string;
  public score!: number;

  constructor(private http: HttpClient) {}

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.ENDPOINT_URL, student);
  }

  updateStudent(student: Student, userUID: string): Observable<Student> {
    return this.http.put<Student>(`${this.ENDPOINT_URL}/${userUID}`, student);
  }

  getStudentByUserUID(userUID: string): Observable<Student> {
    return this.http.get<Student>(`${this.ENDPOINT_URL}/${userUID}`);
  }
}
