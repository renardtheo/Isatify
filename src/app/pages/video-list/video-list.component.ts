import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos: { id: string; url: string }[] = [];
  showForm = false;
  newVideoLink = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    if (this.isBrowser()) {
      const stored = localStorage.getItem('videos');
      this.videos = stored ? JSON.parse(stored) : [];
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addVideo() {
    const videoId = this.extractYouTubeId(this.newVideoLink);
    if (videoId && this.isBrowser()) {
      const video = { id: videoId, url: this.newVideoLink };
      this.videos.push(video);
      localStorage.setItem('videos', JSON.stringify(this.videos));
      this.newVideoLink = '';
      this.showForm = false;
    }
  }

  private extractYouTubeId(url: string): string | null {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
