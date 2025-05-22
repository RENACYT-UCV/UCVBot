import { Student } from './../../../shared/interfaces/student.interface';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'src/app/providers/message/message.service';
import { StudentService } from 'src/app/providers/student/student.service';
import { ToastService } from 'src/app/providers/toast/toast.service';
import { Message } from 'src/app/shared/interfaces/message.interface';

@Component({
  selector: 'app-old-chat',
  templateUrl: './old-chat.component.html',
  styleUrls: ['./old-chat.component.css'],
})
export class OldChatComponent implements OnInit, AfterViewInit {
  @ViewChild('mensajes') appMensajes!: ElementRef<HTMLDivElement>;

  public messages: Message[] = [];
  public evaluatedMessageId: number | null = null;
  public correctAnswerIndex: number | null = null;
  public selectedAnswerIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private toastService: ToastService,
    private authService: AuthService,
    private studentService: StudentService
  ) {}

  ngAfterViewInit(): void {
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.messages.length > 0) {
      const element = this.appMensajes.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }

  evaluate(currentIndex: number, message: Message) {
    console.log('El message id: ' + message.id);
    console.log('El message answer: ' + message.answer);

    if (message.id !== undefined && message.answer !== undefined) {
      this.evaluatedMessageId = message.id;
      this.correctAnswerIndex = message.answer;
      this.selectedAnswerIndex = currentIndex;

      if (currentIndex === message.answer) {
        let consecutiveCorrectAnswers = parseInt(
          localStorage.getItem('consecutiveCorrectAnswers') || '0',
          10
        );
        consecutiveCorrectAnswers++;

        if (consecutiveCorrectAnswers >= 5) {
          this.authService.user.subscribe((user: User | null) => {
            if (user?.uid) {
              this.studentService
                .getStudentByUserUID(user?.uid)
                .subscribe((student: Student) => {
                  if (student.level?.name === 'Básico') {
                    this.toastService.sendState(
                      true,
                      '¡Veo que eres todo un experto, ¿eh?! Subiste de nivel'
                    );
                    console.log('Se creo un nuevo state');

                    student.level.id = 2;

                    if (student.score) {
                      student.score = student.score++;
                    }

                    console.log(
                      'Este es el estudiante a actualizar por level ',
                      student.level.name
                    );

                    this.studentService
                      .updateStudent(student, user.uid)
                      .subscribe();
                  } else if (student.level?.name === 'Intermedio') {
                    this.toastService.sendState(
                      true,
                      '¡Veo que eres todo un experto, ¿eh?! Subiste de nivel'
                    );
                    console.log('Se creo un nuevo state');

                    student.level.id = 3;

                    if (student.score !== undefined) {
                      student.score = student.score++;
                    }

                    this.studentService
                      .updateStudent(student, user.uid)
                      .subscribe();
                  }
                });
            }
          });
          consecutiveCorrectAnswers = 0;
        } else {
          this.toastService.sendState(
            true,
            '¡Muy bien! Es la respuesta correcta'
          );
        }

        if (consecutiveCorrectAnswers < 5) {
          this.authService.user.subscribe((user: User | null) => {
            if (user?.uid) {
              this.studentService
                .getStudentByUserUID(user?.uid)
                .subscribe((student: Student) => {
                  if (student.score !== undefined) {
                    student.score = ++student.score;
                    console.log('Este es el nuevo score: ', student.score);
                  }

                  this.studentService
                    .updateStudent(student, user.uid)
                    .subscribe();
                });
            }
          });
        }

        localStorage.setItem(
          'consecutiveCorrectAnswers',
          consecutiveCorrectAnswers.toString()
        );
      } else {
        const correctAnswer = [
          'Respuesta incorrecta, la respuesta correcta es la opción A',
          'Respuesta incorrecta, la respuesta correcta es la opción B',
          'Respuesta incorrecta, la respuesta correcta es la opción C',
          'Respuesta incorrecta, la respuesta correcta es la opción D',
        ][message.answer];
        this.toastService.sendState(false, correctAnswer);

        // Reiniciar el contador de respuestas correctas consecutivas en caso de respuesta incorrecta
        localStorage.setItem('consecutiveCorrectAnswers', '0');
      }

      // Marcando como respondida esta pregunta
      message.answered = true;
      this.messageService.updateBotMessage(message, message.id).subscribe();

      // this.evaluatedMessageId = null;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const idChat: number = +params['id'];
        this.messageService.getMessagesByChatId(idChat).subscribe({
          next: (v: Message[]) => {
            this.messages = v;
            setTimeout(() => {
              this.scrollToBottom();
            }, 350);
          },
          error: (err: any) => console.error(err),
        });
      },
    });

    this.messageService.messageTransport$.subscribe({
      next: (map) => {
        // Aquí puedes actualizar `messages[]` según lo necesites.
        // Ejemplo: agregando el nuevo mensaje bot y usuario a `messages[]`
        map.forEach((botMessage, userMessage) => {
          this.messages.push(userMessage);
          setTimeout(() => {
            this.scrollToBottom();
          }, 0);
          this.messages.push(botMessage);
          setTimeout(() => {
            this.scrollToBottom();
          }, 0);
        });
      },
    });

    if (!localStorage.getItem('consecutiveCorrectAnswers')) {
      localStorage.setItem('consecutiveCorrectAnswers', '0');
    }
  }

  public trackByMessages(index: number, item: any): number {
    return item.id;
  }
}
