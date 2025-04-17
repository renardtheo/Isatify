import { Injectable } from '@angular/core';
import { Router } from '@angular/router';  // Import du Router
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {  // Injection du Router
    // Vérifie si l'utilisateur est déjà authentifié (vérification dans localStorage), côté client uniquement
    if (this.isBrowser()) {
      const storedAuthState = localStorage.getItem('isLoggedIn');
      if (storedAuthState === 'true') {
        this.isLoggedInSubject.next(true);
      }
    }
  }

  // Vérifie si on est dans le navigateur
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  }

  private setStorageItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  private getStorageItem(key: string): string | null {
    return this.isBrowser() ? localStorage.getItem(key) : null;
  }

  private removeStorageItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  // Méthode pour se connecter
  login(username: string, password: string): boolean {
    // Vérifie si un utilisateur est enregistré dans le localStorage
    const storedUser = this.getStorageItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Vérifie si les informations d'identification correspondent à un utilisateur enregistré
      if (user.username === username && user.password === password) {
        this.setStorageItem('isLoggedIn', 'true');
        this.isLoggedInSubject.next(true);  // Notifie que l'utilisateur est connecté
        this.router.navigate(['/home']);  // Redirige vers la page d'accueil après la connexion
        return true;
      }
    }
    return false;  // Les informations de connexion sont incorrectes
  }

  // Méthode pour enregistrer un utilisateur
  register(user: User): void {
    // Sauvegarde l'utilisateur dans le localStorage
    this.setStorageItem('user', JSON.stringify(user));
    this.router.navigate(['/login']);  // Redirige vers la page de connexion après l'inscription
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Récupère l'utilisateur connecté
  getCurrentUser(): User | null {
    const user = this.getStorageItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Méthode pour se déconnecter
  logout() {
    this.removeStorageItem('isLoggedIn');
    this.isLoggedInSubject.next(false);  // Notifie que l'utilisateur est déconnecté
    this.router.navigate(['/login']);  // Redirige vers la page de connexion après la déconnexion
  }
}
