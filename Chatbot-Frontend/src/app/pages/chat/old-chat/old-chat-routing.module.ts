import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldChatComponent } from './old-chat.component';

const OLD_CHAT_ROUTES: Routes = [
  {
    path: '',
    component: OldChatComponent,
    title: 'UcvBot | ¡Aprende Java Ya!',
  },
];

@NgModule({
  imports: [RouterModule.forChild(OLD_CHAT_ROUTES)],
})
export class OldChatRoutingModule {}
