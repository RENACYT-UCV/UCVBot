import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChatService } from 'src/app/providers/chat/chat.service';
import { MessageService } from 'src/app/providers/message/message.service';
import { ToastService } from 'src/app/providers/toast/toast.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { BotResponse } from 'src/app/shared/interfaces/bot_response.interface';
import { ChatSummary } from 'src/app/shared/interfaces/chat_summary.interface';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { NewMessage } from 'src/app/shared/interfaces/new_message.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('arrow') arrow!: ElementRef<HTMLButtonElement>;

  mensaje: string = '';
  correctAnswer!: boolean;
  messageToast: string = '';
  showToast: boolean = false;
  subscription!: Subscription;
  uid: any;
  name: any;

  constructor(
    public chatService: ChatService,
    private renderer2: Renderer2,
    public messageService: MessageService,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.uid = user?.uid;
      this.name = user?.displayName;
    });

    this.subscription = this.toastService.state$.subscribe({
      next: (value: any) => {
        this.correctAnswer = value.correctAnswer;
        if (value.message) {
          this.messageToast = value.message;
        }
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, value.time);
      },
    });
  }

  sendMessage(message: string): void {
    if (this.mensaje !== '') {
      if (this.router.url === '/chat') {
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

              // this.chatSummary = chatSummary;
              this.chatService.updateChatSummary(chatSummary);
              console.log('SE CREO UN NUEVO CHAT', chatSummary);
            }

            this.router.navigate(['chat', v.idChat]);
          },
          error: (err) => console.error(err),
        });
      } else {
        // /chat/3
        const urlItems: string[] = this.router.url.split('/');
        const idChat: number = Number(urlItems[urlItems.length - 1]);

        const messageModel: Message = {
          statement: message,
          role: 'user',
          unixTime: new Date().getTime(),
        };

        console.log('Este es el id del chat desde CHATComponent');
        console.log(idChat);

        this.messageService.addMessage(messageModel, idChat).subscribe({
          next: (botMessage: BotResponse) => {
            const map: Map<any, any> = new Map();
            map.set(messageModel, botMessage);

            this.messageService.updateMessageTransport(map);

            console.log('Este es el messageTransport');

            this.messageService.messageTransport$.subscribe((message) =>
              console.log(message)
            );

            // this.router.navigate(['chat', 'c', idChat]);
          },
        });
      }
    }

    this.mensaje = '';
  }

  public trackByChats(index: number, item: any): number {
    return item.fecha;
  }

  ngAfterViewInit(): void {
    const arrow = this.arrow.nativeElement;
    arrow.addEventListener('mouseenter', this.onHover.bind(this));
    arrow.addEventListener('mouseleave', this.onLeave.bind(this));
  }

  onHover(): void {
    const arrow = this.arrow.nativeElement;
    if (arrow.getAttribute('data-state') === 'opened') {
      const arrowTop = arrow.querySelector('.arrow-top') as HTMLDivElement;
      const arrowBottom = arrow.querySelector(
        '.arrow-bottom'
      ) as HTMLDivElement;
      arrowTop.style.transform =
        'translateY(0.15rem) rotate(15deg) translateZ(0px)';
      arrowBottom.style.transform =
        'translateY(-0.15rem) rotate(-15deg) translateZ(0px)';
    }
  }

  onLeave(): void {
    const arrow = this.arrow.nativeElement;
    if (arrow.getAttribute('data-state') === 'opened') {
      const arrowTop = arrow.querySelector('.arrow-top') as HTMLDivElement;
      const arrowBottom = arrow.querySelector(
        '.arrow-bottom'
      ) as HTMLDivElement;
      arrowTop.style.transform =
        'translateY(0.15rem) rotate(0deg) translateZ(0px)';
      arrowBottom.style.transform =
        'translateY(-0.15rem) rotate(0deg) translateZ(0px)';
    }
  }

  changeArrowState(): void {
    const arrow = this.arrow.nativeElement;
    const sidebar = this.sidebar.nativeElement;
    const arrowTop = arrow.querySelector('.arrow-top') as HTMLDivElement;
    const arrowBottom = arrow.querySelector('.arrow-bottom') as HTMLDivElement;

    if (arrow.getAttribute('data-state') === 'closed') {
      arrowTop.style.transform =
        'translateY(0.15rem) rotate(0deg) translateZ(0px)';
      arrowBottom.style.transform =
        'translateY(-0.15rem) rotate(0deg) translateZ(0px)';
      // Cambiamos el estado
      arrow.setAttribute('data-state', 'opened');
      // Abrir el sidebar
      this.renderer2.removeStyle(sidebar, 'display');
    } else {
      arrowTop.style.transform =
        'translateY(0.15rem) rotate(-15deg) translateZ(0px)';
      arrowBottom.style.transform =
        'translateY(-0.15rem) rotate(15deg) translateZ(0px)';
      // Cambiamos el estado
      arrow.setAttribute('data-state', 'closed');
      // Cerrar el sidebar
      sidebar.style.display = 'none';
    }

    const state = arrow.getAttribute('data-state');
    console.log('Este es el data-state', state);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
