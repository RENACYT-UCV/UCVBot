import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
})
export class GreetingComponent implements OnInit {
  public name$!: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user$ = this.authService.user;

    this.name$ = user$.pipe(
      map((user: User | null) => {
        if (user?.displayName) {
          const firstName = user.displayName.split(' ')[0];
          return (
            firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
          );
        }
        return '';
      })
    );
  }
}
