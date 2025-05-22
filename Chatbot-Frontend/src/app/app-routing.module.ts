import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { emailDomainCheck } from './auth/pipes/email-domain-check.pipe';
import { canActivate } from '@angular/fire/auth-guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.LocalAuthModule),
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    // Descomentar esta línea para activar restricción según correo @ucv.edu.pe
    // ...canActivate(() => emailDomainCheck),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/welcome/greeting/greeting.module').then(
            (m) => m.GreetingModule
          ),
      },
      {
        path: 'choose-level',
        loadChildren: () =>
          import('./pages/welcome/choose-level/choose-level.module').then(
            (m) => m.ChooseLevelModule
          ),
      },
      {
        path: 'first-exercise',
        loadChildren: () =>
          import(
            './pages/welcome/exercises/first-exercise/first-exercise.module'
          ).then((m) => m.FirstExerciseModule),
      },
      {
        path: 'second-exercise',
        loadChildren: () =>
          import(
            './pages/welcome/exercises/second-exercise/second-exercise.module'
          ).then((m) => m.SecondExerciseModule),
      },
      {
        path: 'third-exercise',
        loadChildren: () =>
          import(
            './pages/welcome/exercises/third-exercise/third-exercise.module'
          ).then((m) => m.ThirdExerciseModule),
      },
      {
        path: 'fourth-exercise',
        loadChildren: () =>
          import(
            './pages/welcome/exercises/fourth-exercise/fourth-exercise.module'
          ).then((m) => m.FourthExerciseModule),
      },
      {
        path: 'fifth-exercise',
        loadChildren: () =>
          import(
            './pages/welcome/exercises/fifth-exercise/fifth-exercise.module'
          ).then((m) => m.FifthExerciseModule),
      },
      {
        path: 'results-test',
        loadChildren: () =>
          import('./pages/welcome/result/result.module').then(
            (m) => m.ResultModule
          ),
      },
    ],
  },
  {
    path: 'chat',
    component: ChatComponent,
    // Descomentar esta línea para activar restricción según correo @ucv.edu.pe
    // ...canActivate(() => emailDomainCheck),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/chat/new-chat/new-chat.module').then(
            (m) => m.NewChatModule
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./pages/chat/old-chat/old-chat.module').then(
            (m) => m.OldChatModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
