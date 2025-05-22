import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FifthExerciseComponent } from './fifth-exercise.component';

const ROUTES: Routes = [
  {
    path: '',
    component: FifthExerciseComponent,
    title: 'UcvBot | Quinto Ejercicio',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class FifthExerciseRoutingModule {}
