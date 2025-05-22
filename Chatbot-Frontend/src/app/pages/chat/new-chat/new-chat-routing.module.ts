import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewChatComponent } from './new-chat.component';

const MAIN_AUTH_ROUTES: Routes = [
  {
    path: '',
    component: NewChatComponent,
    title: 'UcvBot | ¡Aprende Java Ya!',
  },
];

@NgModule({
  imports: [RouterModule.forChild(MAIN_AUTH_ROUTES)],
})
export class NewChatRoutingModule {}
