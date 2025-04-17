import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { VideoListComponent } from './pages/video-list/video-list.component';
import { AddVideoComponent } from './pages/video-add/video-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'videos', component: VideoListComponent },
  { path: 'videos/add', component: AddVideoComponent }, // Formulaire d'ajout
];
