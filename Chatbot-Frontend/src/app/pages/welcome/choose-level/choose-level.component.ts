import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ExerciseService } from 'src/app/providers/exercise/exercise.service';
import { LevelService } from 'src/app/providers/level/level.service';
import { Exercise } from 'src/app/shared/interfaces/exercise.interface';
import { Level } from 'src/app/shared/interfaces/level.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.css'],
})
export class ChooseLevelComponent implements OnInit, OnDestroy {
  levels$!: Observable<Level[]>;
  exerciseSubscription!: Subscription;
  selectedIndex: number | null = null;
  error: string | null = null;

  constructor(
    private levelService: LevelService,
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.levels$ = this.levelService.getAllLevels();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  generateTest(level: Level, index: number): void {
    if (level.name !== undefined) {
      const levelName: string = level.name;
      console.log('Este es el levelName: ', levelName);
      this.selectedIndex = index;
      this.error = null;

      this.exerciseSubscription = this.exerciseService
        .getExercise(levelName)
        .subscribe({
          next: (exercises: Exercise[]) => {
            if (exercises && exercises.length > 0) {
              localStorage.setItem('exercises', JSON.stringify(exercises));
              localStorage.setItem('level', JSON.stringify(level));
              console.log('Estos son los ejercicios: ');
              console.log(exercises);
              this.router.navigate(['/welcome/first-exercise']);
            } else {
              this.error = 'No se encontraron ejercicios para este nivel';
            }
          },
          error: (error) => {
            console.error('Error al obtener ejercicios:', error);
            this.error = 'Error al cargar los ejercicios. Por favor, intenta de nuevo.';
          }
        });
    }
  }
}
