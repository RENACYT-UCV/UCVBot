import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Student } from '../../interfaces/student.interface';
import { StudentService } from 'src/app/providers/student/student.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public initials$!: Observable<string>;
  public name$!: Observable<string>;
  public email$!: Observable<string>;
  student!: Student;

  constructor(
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    const user$ = this.authService.user;

    this.name$ = user$.pipe(
      map((user: User | null) => user?.displayName || '')
    );

    this.email$ = user$.pipe(map((user: User | null) => user?.email || ''));

    this.initials$ = this.name$.pipe(
      map((name) => {
        const firstLetter = name.charAt(0);
        const secondLetter = name.split(' ')[1]?.charAt(0) || '';
        return firstLetter + secondLetter;
      })
    );

    this.authService.user.subscribe((user) => {
      const uid = user?.uid;
      if (uid) {
        this.studentService
          .getStudentByUserUID(uid)
          .pipe(
            catchError((error) => {
              console.error('Error al obtener estudiante:', error);
              if (error.status === 500) {
                // Si el estudiante no existe, lo creamos
                const newStudent: Student = {
                  userUID: uid,
                  userName: user?.displayName || '',
                  email: user?.email || '',
                  photoURL: user?.photoURL || '',
                  level: { id: 1 },
                  correctExercises: 0,
                  incorrectExercises: 0,
                  score: 0
                };

                return this.studentService.saveStudent(newStudent);
              }
              return of(null);
            })
          )
          .subscribe((student) => {
            if (student) {
              this.student = student;
              localStorage.setItem('student', JSON.stringify(student));
            }
          });
      }
    });
  }

  logout(): void {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/']);
        localStorage.clear();
      })
      .catch((error) => console.error(error));
  }
}
