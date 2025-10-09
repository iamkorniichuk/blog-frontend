import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUpscalePageComponent } from './image-upscale-page';

describe('ImageUpscalePageComponent', () => {
  let component: ImageUpscalePageComponent;
  let fixture: ComponentFixture<ImageUpscalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUpscalePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUpscalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
