import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCompareComponent } from './slider-compare';

describe('SliderCompareComponent', () => {
  let component: SliderCompareComponent;
  let fixture: ComponentFixture<SliderCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderCompareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
