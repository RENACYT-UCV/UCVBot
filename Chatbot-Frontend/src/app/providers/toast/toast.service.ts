import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private stateSource = new Subject<any>();
  state$ = this.stateSource.asObservable();

  constructor() {}

  sendState(correctAnswer: boolean, message: string = '', time: number = 3400) {
    this.stateSource.next({ correctAnswer, message, time });
  }
}
