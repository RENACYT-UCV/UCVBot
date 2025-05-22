import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const MAIN_AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login | UcvBot',
  },
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_AUTH_ROUTES)],
})
export class LocalAuthRoutingModule {}
