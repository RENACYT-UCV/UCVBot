import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/interfaces/exercise.interface';

@Component({
  selector: 'app-third-exercise',
  templateUrl: './third-exercise.component.html',
  styleUrls: ['./third-exercise.component.css'],
})
export class ThirdExerciseComponent implements OnInit {
  constructor() {}

  exercise!: Exercise;
  selectedAlternativeIndex: number | null = null;
  correctAnswersCount: number = 0;

  ngOnInit(): void {
    const exercisesString = localStorage.getItem('exercises');
    if (exercisesString) {
      const exercisesJson: Exercise[] = JSON.parse(exercisesString);
      this.exercise = exercisesJson[2];
    }

    const selectedAlternative = localStorage.getItem(
      'thirdExercise-selectedAlternative'
    );
    if (selectedAlternative !== null) {
      this.selectedAlternativeIndex = Number(selectedAlternative);
    }

    const correctAnswersCount = localStorage.getItem('correctAnswersCount');
    if (correctAnswersCount !== null) {
      this.correctAnswersCount = Number(correctAnswersCount);
    }
  }

  evaluate(index: number): void {
    if (index !== this.selectedAlternativeIndex) {
      const wasPreviouslyCorrect =
        this.selectedAlternativeIndex === this.exercise.answer;
      const isNowCorrect = index === this.exercise.answer;

      this.selectedAlternativeIndex = index;

      if (isNowCorrect && !wasPreviouslyCorrect) {
        this.correctAnswersCount++;
      } else if (!isNowCorrect && wasPreviouslyCorrect) {
        this.correctAnswersCount--;
      }

      localStorage.setItem(
        'thirdExercise-selectedAlternative',
        String(this.selectedAlternativeIndex)
      );
      localStorage.setItem(
        'correctAnswersCount',
        String(this.correctAnswersCount)
      );
    }
  }
}
