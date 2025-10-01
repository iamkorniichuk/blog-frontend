import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialPageComponent } from './tutorial-page';

describe('TutorialPageComponent', () => {
  let component: TutorialPageComponent;
  let fixture: ComponentFixture<TutorialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
