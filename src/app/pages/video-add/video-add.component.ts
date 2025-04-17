// src/app/videos/video-add/video-add.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-add.component.html',
  styleUrls: ['./video-add.component.css']
})
export class AddVideoComponent {
  title = '';
  description = '';
  url = '';
successMessage: any;
errorMessage: any;

  constructor(private router: Router) {}

  addVideo() {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/;
    const match = this.url.match(regExp);
    const videoId = match ? match[1] : null;

    if (videoId && this.title.trim()) {
      const video = {
        id: videoId,
        title: this.title,
        description: this.description,
        url: this.url
      };

      const stored = localStorage.getItem('videos');
      const videos = stored ? JSON.parse(stored) : [];
      videos.push(video);
      localStorage.setItem('videos', JSON.stringify(videos));

      this.router.navigate(['/videos']);
    }
  }
}