import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalUser } from '../../interfaces/local_user.interface.interface';
import { CommonModule } from '@angular/common';
import { ChatSummary } from '../../interfaces/chat_summary.interface';
import { ChatService } from 'src/app/providers/chat/chat.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterViewInit, OnInit {
  @ViewChildren('listItem') listItems!: QueryList<ElementRef<HTMLLIElement>>;

  public user: LocalUser = {
    name: '',
    uid: '',
    email: '',
  };

  public chats: ChatSummary[] = [];

  constructor(
    private renderer: Renderer2,
    private chatService: ChatService,
    private router: Router,
    private authService: AuthService
  ) {}

  addChatSummary(newChat: ChatSummary): void {
    this.chats.push(newChat);
  }

  displayNewChat() {
    this.router.navigate(['/chat']);
  }

  displayOldChat(idChat: number) {
    this.router.navigate([`/chat/${idChat}`]);
  }

  ngOnInit(): void {
    this.authService.user.subscribe({
      next: (aUser: User | null) => {
        if (aUser !== null) {
          if (aUser.displayName !== null && aUser.email !== null) {
            this.user.name = aUser.displayName;
            this.user.uid = aUser.uid;
            this.user.email = aUser.email;

            this.chatService.getAllChatsByUserUID(this.user.uid).subscribe({
              next: (chats: ChatSummary[]) => {
                this.chats = chats;
                console.log('Estos son los chats: ', this.chats);
              },
            });
          }
        }
      },
      error: (err: any) => console.error(err),
    });

    this.chatService.currentChatSummary.subscribe(
      (chatSummary: ChatSummary | null) => {
        if (chatSummary !== null) {
          this.chats.push(chatSummary);
          console.log(
            'SE AÑADIO MEDIANTE EL SERVICIO EL NUEVO CHAT: ',
            chatSummary
          );
        }
      }
    );

    console.log('Se inicio el sidebar');
  }

  ngAfterViewInit(): void {
    this.listItems.forEach((li) => {
      const link = li.nativeElement.querySelector('a') as HTMLAnchorElement;
      if (link.scrollWidth > link.clientWidth) {
        this.renderer.addClass(li.nativeElement, 'overflowing');
      }
    });
  }

  public trackByChats(index: number, chat: ChatSummary): number {
    return chat.id;
  }
}
