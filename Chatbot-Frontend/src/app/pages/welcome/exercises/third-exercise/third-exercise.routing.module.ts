import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdExerciseComponent } from './third-exercise.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ThirdExerciseComponent,
    title: 'UcvBot | Tercer Ejercicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class ThirdExerciseRoutingModule {}
