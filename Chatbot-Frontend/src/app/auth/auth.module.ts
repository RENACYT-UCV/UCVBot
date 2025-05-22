import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { AuthModule, provideAuth } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { LocalAuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AuthModule,
    LocalAuthRoutingModule,
  ],
})
export class LocalAuthModule {}
