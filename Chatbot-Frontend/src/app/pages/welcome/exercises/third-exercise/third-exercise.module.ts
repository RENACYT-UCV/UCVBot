import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThirdExerciseRoutingModule } from './third-exercise.routing.module';
import { ThirdExerciseComponent } from './third-exercise.component';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThirdExerciseRoutingModule,
    HighlightJsModule,
  ],
  declarations: [ThirdExerciseComponent],
})
export class ThirdExerciseModule {}
