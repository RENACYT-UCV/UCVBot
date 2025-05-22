import { User } from '@angular/fire/auth';
import { AuthPipe } from '@angular/fire/auth-guard';
import { Observable, map } from 'rxjs';

export const emailDomainCheck: AuthPipe = (user$: Observable<User | null>) => {
  return user$.pipe(
    map((user: User | null) => {
      if (user && user.email && user.email.endsWith('@ucvvirtual.edu.pe')) {
        return true;
      } else {
        alert('INGRESA CON TU CORREO INSTITUCIONAL');
        return ['/'];
      }
    })
  );
};
