import { NgModule } from '@angular/core';
import { OldChatComponent } from './old-chat.component';
import { CommonModule } from '@angular/common';
import { HighlightJsModule } from 'ngx-highlight-js';
import { OldChatRoutingModule } from './old-chat-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OldChatComponent],
  imports: [
    CommonModule,
    HighlightJsModule,
    OldChatRoutingModule,
    RouterModule,
  ],
})
export class OldChatModule {}
