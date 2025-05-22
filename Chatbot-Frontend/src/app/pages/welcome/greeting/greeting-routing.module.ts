import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting.component';

const ROUTES: Routes = [
  {
    path: '',
    component: GreetingComponent,
    title: 'UcvBot | Bienvenida',
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class GreetingRoutingModule {}
