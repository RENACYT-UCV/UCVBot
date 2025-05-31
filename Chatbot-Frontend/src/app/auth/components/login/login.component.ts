import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/providers/student/student.service';
import { UserCredential } from '@angular/fire/auth';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Component({
  selector: 'auth-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService
  ) { }

  ingresar() {
    localStorage.removeItem('exercises');
    this.authService
      .login()
      .then((userCredential: UserCredential) => {
        const uid = userCredential.user.uid;
        this.studentService
          .getStudentByUserUID(uid)
          .subscribe({
            next: (student: Student) => {
              if (student.status === undefined) {
                this.router.navigate(['/chat']);
              } else {
                this.router.navigate(['/welcome']);
              }
            },
            error: (error) => {
              console.error('Error al obtener estudiante:', error);
              // Si el estudiante no existe, lo creamos
              if (error.status === 500) {
                const newStudent: Student = {
                  userUID: uid,
                  userName: userCredential.user.displayName || '',
                  email: userCredential.user.email || '',
                  photoURL: userCredential.user.photoURL || '',
                  level: { id: 1 }, // Nivel por defecto
                  correctExercises: 0,
                  incorrectExercises: 0,
                  score: 0
                };

                this.studentService.saveStudent(newStudent).subscribe({
                  next: (savedStudent) => {
                    localStorage.setItem('student', JSON.stringify(savedStudent));
                    this.router.navigate(['/welcome']);
                  },
                  error: (saveError) => {
                    console.error('Error al crear estudiante:', saveError);
                  }
                });
              }
            }
          });
      })
      .catch((error) => console.error(error));
  }
}
