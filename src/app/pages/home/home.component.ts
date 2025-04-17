import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(public authService: AuthService) {}

  get username(): string {
    return this.authService.getCurrentUser()?.username || '';
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
