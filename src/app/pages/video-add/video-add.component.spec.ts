import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddComponent } from './video-add.component';

describe('VideoAddComponent', () => {
  let component: VideoAddComponent;
  let fixture: ComponentFixture<VideoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
