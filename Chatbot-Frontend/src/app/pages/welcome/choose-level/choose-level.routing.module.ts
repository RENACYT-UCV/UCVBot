import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseLevelComponent } from './choose-level.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ChooseLevelComponent,
    title: 'UcvBot | Elegir nivel',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class ChooseLevelRoutingModule {}
