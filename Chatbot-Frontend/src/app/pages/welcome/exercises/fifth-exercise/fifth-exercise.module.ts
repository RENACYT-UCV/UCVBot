import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FifthExerciseRoutingModule } from './fifth-exercise.routing.module';
import { FifthExerciseComponent } from './fifth-exercise.component';
import { HighlightJsModule } from 'ngx-highlight-js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FifthExerciseRoutingModule,
    HighlightJsModule,
  ],
  declarations: [FifthExerciseComponent],
})
export class FifthExerciseModule {}
