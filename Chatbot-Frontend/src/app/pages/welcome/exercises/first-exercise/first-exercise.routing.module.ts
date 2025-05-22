import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstExerciseComponent } from './first-exercise.component';

const ROUTES: Routes = [
  {
    path: '',
    component: FirstExerciseComponent,
    title: 'UcvBot | Primer ejercicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class FirstExerciseRoutingModule {}
