import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Importer Router
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Assurez-vous que RouterModule est bien dans imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  // OnInit pour vérifier l'état de l'authentification au démarrage
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Vérifie si l'utilisateur est déjà connecté
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est connecté, redirige directement vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/videos']);  // Redirection vers la page d'accueil
    } else {
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  }
}
