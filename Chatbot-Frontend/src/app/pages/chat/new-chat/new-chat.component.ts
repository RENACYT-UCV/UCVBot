import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/providers/message/message.service';
import { Observable, map } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BotResponse } from 'src/app/shared/interfaces/bot_response.interface';
import { ChatSummary } from 'src/app/shared/interfaces/chat_summary.interface';
import { NewMessage } from 'src/app/shared/interfaces/new_message.interface';
import { ChatService } from 'src/app/providers/chat/chat.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css'],
})
export class NewChatComponent implements OnInit {
  mensajeRecibido: string = '';
  private uid: any;
  private name: any;

  public name$!: Observable<string>;

  firstPairPrompts: string[] = [
    'Dame ejercicios básicos en Java',
    'Definición de Java',
  ];

  secondPairPrompts: string[] = [
    'Dame ejercicios de for',
    'Crea ejercicios de if',
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.uid = user?.uid;
      this.name = user?.displayName;
    });

    const user$ = this.authService.user;

    this.name$ = user$.pipe(
      map((user: User | null) => {
        if (user?.displayName) {
          const firstName = user.displayName.split(' ')[0];
          return (
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
          );
        }
        return '';
      })
    );

    this.messageService.currentMessage.subscribe({
      next: (message: string) => {
        this.mensajeRecibido = message;
        if (this.mensajeRecibido) {
          this.sendMessage(this.mensajeRecibido);
        }
      },
    });
  }

  sendMessage(message: string): void {
    const chatAndMessage: NewMessage = {
      statement: message,
      role: 'user',
      unixTime: new Date().getTime(),
      student: {
        userUID: this.uid,
      },
    };
    this.chatService.saveChatAndMessage(chatAndMessage).subscribe({
      next: (v: BotResponse) => {
        // Redireccionar a la nueva ruta con el idChat
        // this.router.navigate([`/c/${this.botResponse.idChat}`]);

        if (v.idChat !== undefined && v.student.userUID !== undefined) {
          const chatSummary: ChatSummary = {
            id: v.idChat,
            title: v.chatTitle,
            userUID: v.student.userUID,
          };

          // Enviando el nuevo chat al sidebar
          this.chatService.updateChatSummary(chatSummary);
          console.log('SE CREO UN NUEVO CHAT', chatSummary);
        }

        this.router.navigate(['chat', v.idChat]);
      },
      error: (err: any) => console.error(err),
    });
  }
}
