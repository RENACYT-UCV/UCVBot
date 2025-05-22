import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SecondExerciseComponent } from './second-exercise.component';
import { SecondExerciseRoutingModule } from './second-exercise.routing.module';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SecondExerciseRoutingModule,
    HighlightJsModule,
  ],
  declarations: [SecondExerciseComponent],
})
export class SecondExerciseModule {}
