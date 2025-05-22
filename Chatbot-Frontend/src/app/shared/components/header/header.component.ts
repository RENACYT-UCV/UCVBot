import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
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
  ) {}

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
      console.log('Este es el uid desde el headerrrrrrr');
      console.log(uid);
      if (uid) {
        this.studentService
          .getStudentByUserUID(uid)
          .subscribe((student: Student) => {
            this.student = student;
            console.log('Este es el estudiante desde el headerrr');
            console.log(this.student);
          });
      }
    });

    // const studentString = localStorage.getItem('student');

    // if (studentString) {
    //   this.student = JSON.parse(studentString) as Student;
    //   console.log('Este es el student logueadooo: ');
    //   console.log(this.student);
    // }
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
