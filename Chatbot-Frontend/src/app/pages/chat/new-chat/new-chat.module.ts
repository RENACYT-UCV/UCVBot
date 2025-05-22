import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewChatComponent } from './new-chat.component';
import { RouterModule } from '@angular/router';
import { NewChatRoutingModule } from './new-chat-routing.module';

@NgModule({
  declarations: [NewChatComponent],
  imports: [CommonModule, FormsModule, RouterModule, NewChatRoutingModule],
  exports: [],
  providers: [],
})
export class NewChatModule {}
