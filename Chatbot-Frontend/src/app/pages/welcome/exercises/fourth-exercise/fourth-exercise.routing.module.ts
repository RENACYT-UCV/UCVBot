import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourthExerciseComponent } from './fourth-exercise.component';

const ROUTES: Routes = [
  {
    path: '',
    component: FourthExerciseComponent,
    title: 'UcvBot | Cuarto Ejercicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class FourthExerciseRoutingModule {}
