import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './pages/chat/chat.component';
import { CommonModule } from '@angular/common';
import { LocalAuthModule } from './auth/auth.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalAuthModule,
    ChatComponent,
    WelcomeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
