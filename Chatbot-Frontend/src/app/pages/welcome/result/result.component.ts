import { Component, OnInit } from '@angular/core';
import { Level } from 'src/app/shared/interfaces/level.interface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  testApproved: boolean = false;
  levelName: string | null = null;

  ngOnInit(): void {
    const levelString = localStorage.getItem('level');
    if (levelString) {
      const levelParsed: Level = JSON.parse(levelString);
      if (levelParsed.name) {
        this.levelName = levelParsed.name;
      }
    }

    const correctAnswersCount = localStorage.getItem('correctAnswersCount');
    if (correctAnswersCount !== null) {
      const parsed: number = Number(correctAnswersCount);
      const totalQuestions: number = 5;
      if (parsed > totalQuestions / 2) {
        this.testApproved = true;
      }

      localStorage.setItem('testApproved', JSON.stringify(this.testApproved));
    }
  }
}
