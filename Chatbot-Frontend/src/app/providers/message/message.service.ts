import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BotResponse } from 'src/app/shared/interfaces/bot_response.interface';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { SERVER_NAME } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private ENDPOINT_URL: string = SERVER_NAME + '/messages';

  private messageTransportSource = new BehaviorSubject<Map<any, any>>(
    new Map()
  );
  messageTransport$ = this.messageTransportSource.asObservable();

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  public changeMessage(message: string) {
    this.messageSource.next(message);
  }

  public updateMessageTransport(map: Map<any, any>) {
    this.messageTransportSource.next(map);
  }

  public addMessage(message: Message, idChat: number): Observable<BotResponse> {
    return this.http.post<BotResponse>(
      `${this.ENDPOINT_URL}/chat/${idChat}`,
      message
    );
  }

  public updateBotMessage(
    message: Message,
    idMessage: number
  ): Observable<BotResponse> {
    return this.http.put<BotResponse>(
      `${this.ENDPOINT_URL}/${idMessage}`,
      message
    );
  }

  public getMessagesByChatId(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.ENDPOINT_URL}/chat/${chatId}`);
  }
}
