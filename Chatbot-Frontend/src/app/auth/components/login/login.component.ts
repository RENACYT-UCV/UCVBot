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
  ) {}

  ingresar() {
    localStorage.removeItem('exercises');
    this.authService
      .login()
      .then((userCredential: UserCredential) => {
        const uid = userCredential.user.uid;
        this.studentService
          .getStudentByUserUID(uid)
          .subscribe((student: Student) => {
            if (student.status === undefined) {
              this.router.navigate(['/chat']);
            } else {
              this.router.navigate(['/welcome']);
            }
          });
      })
      .catch((error) => console.error(error));
  }
}
