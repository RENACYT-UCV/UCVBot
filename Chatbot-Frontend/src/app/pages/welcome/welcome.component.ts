import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StudentService } from 'src/app/providers/student/student.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Level } from 'src/app/shared/interfaces/level.interface';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  nextPage(): void {
    if (this.isWelcomePage()) {
      this.router.navigate(['/welcome/choose-level']);
    } else if (this.isChooseLevelPage()) {
      this.router.navigate(['/welcome/first-exercise']);
    } else if (this.isFirstExercise()) {
      this.router.navigate(['/welcome/second-exercise']);
    } else if (this.isSecondExercise()) {
      this.router.navigate(['/welcome/third-exercise']);
    } else if (this.isThirdExercise()) {
      this.router.navigate(['/welcome/fourth-exercise']);
    } else if (this.isFourthExercise()) {
      this.router.navigate(['/welcome/fifth-exercise']);
    } else if (this.isFifthExercise()) {
      this.router.navigate(['/welcome/results-test']);
    } else if (this.isResultPage()) {
      this.createStudent();
    }
  }

  private isWelcomePage(): boolean {
    return this.router.url === '/welcome';
  }

  private isChooseLevelPage(): boolean {
    return this.router.url === '/welcome/choose-level';
  }

  private isFirstExercise(): boolean {
    return this.router.url === '/welcome/first-exercise';
  }

  private isSecondExercise(): boolean {
    return this.router.url === '/welcome/second-exercise';
  }

  private isThirdExercise(): boolean {
    return this.router.url === '/welcome/third-exercise';
  }

  private isFourthExercise(): boolean {
    return this.router.url === '/welcome/fourth-exercise';
  }

  private isFifthExercise(): boolean {
    return this.router.url === '/welcome/fifth-exercise';
  }

  private isResultPage(): boolean {
    return this.router.url === '/welcome/results-test';
  }

  private createStudent(): void {
    this.authService.user.subscribe((user: User | null) => {
      const levelStorage = localStorage.getItem('level');

      if (
        user?.uid &&
        user?.displayName &&
        user?.email !== null &&
        user?.email !== undefined &&
        user.photoURL !== null &&
        levelStorage !== null
      ) {
        let parsedLevel: Level = { id: 1 }; // Inicialización con un valor por defecto

        if (localStorage.getItem('testApproved') === 'true') {
          parsedLevel = JSON.parse(levelStorage);
        }

        const userUID = user?.uid;
        const userName = user?.displayName;
        const email: string = user?.email;
        const photoURL: string = user.photoURL;
        const level: Level = parsedLevel;
        const correctExercises: number = 0;
        const incorrectExercises: number = 0;
        const score: number = 0;

        const student: Student = {
          userUID: userUID,
          userName: userName,
          email: email,
          photoURL: photoURL,
          level: level,
          correctExercises: correctExercises,
          incorrectExercises: incorrectExercises,
          score: score,
        };

        this.studentService
          .saveStudent(student)
          .subscribe((student: Student) => {
            localStorage.setItem('student', JSON.stringify(student));
            this.router.navigate(['/chat']);
          });
      }
    });
  }
}
