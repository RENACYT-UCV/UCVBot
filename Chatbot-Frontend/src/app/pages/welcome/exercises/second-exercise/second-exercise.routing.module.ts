import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondExerciseComponent } from './second-exercise.component';

const ROUTES: Routes = [
  {
    path: '',
    component: SecondExerciseComponent,
    title: 'UcvBot | Segundo Ejercicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class SecondExerciseRoutingModule {}
