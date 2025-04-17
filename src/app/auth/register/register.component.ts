import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation de FormsModule
import { CommonModule } from '@angular/common'; // Pour les directives comme ngIf, ngFor
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Ajoutez FormsModule ici
  providers: [AuthService],  // Vous pouvez aussi ajouter AuthService si nécessaire
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  // Méthode d'inscription
  register() {
    if (this.username && this.email && this.password) {
      const user = { username: this.username, email: this.email, password: this.password };
      this.authService.register(user);  // Appelle la méthode register du service AuthService
    } else {
      alert('Veuillez remplir tous les champs!');
    }
  }
}
