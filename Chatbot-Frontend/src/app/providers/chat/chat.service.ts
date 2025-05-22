import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_NAME } from 'src/environments/environment';
import { BotResponse } from 'src/app/shared/interfaces/bot_response.interface';
import { Chat } from 'src/app/shared/interfaces/chat.interface';
import { ChatSummary } from 'src/app/shared/interfaces/chat_summary.interface';
import { NewMessage } from 'src/app/shared/interfaces/new_message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private ENDPOINT_URL: string = SERVER_NAME + '/chats';
  private chatSummarySource = new BehaviorSubject<ChatSummary | null>(null);
  currentChatSummary = this.chatSummarySource.asObservable();

  constructor(private http: HttpClient) {}

  updateChatSummary(chatSummary: ChatSummary): void {
    this.chatSummarySource.next(chatSummary);
  }

  public saveChatAndMessage(
    chatAndMessage: NewMessage
  ): Observable<BotResponse> {
    return this.http.post<BotResponse>(this.ENDPOINT_URL, chatAndMessage);
  }

  public getAll(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.ENDPOINT_URL);
  }

  public getAllChatsByUserUID(userUID: string): Observable<ChatSummary[]> {
    return this.http.get<ChatSummary[]>(
      `${this.ENDPOINT_URL}/chatSummary/${userUID}`
    );
  }
}
