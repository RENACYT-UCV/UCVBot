import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirstExerciseComponent } from './first-exercise.component';
import { FirstExerciseRoutingModule } from './first-exercise.routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FirstExerciseRoutingModule,
    HighlightJsModule,
  ],
  declarations: [FirstExerciseComponent],
})
export class FirstExerciseModule {}
