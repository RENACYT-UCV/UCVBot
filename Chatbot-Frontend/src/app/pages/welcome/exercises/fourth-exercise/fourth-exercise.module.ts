import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FourthExerciseRoutingModule } from './fourth-exercise.routing.module';
import { FourthExerciseComponent } from './fourth-exercise.component';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FourthExerciseRoutingModule,
    HighlightJsModule,
  ],
  declarations: [FourthExerciseComponent],
})
export class FourthExerciseModule {}
