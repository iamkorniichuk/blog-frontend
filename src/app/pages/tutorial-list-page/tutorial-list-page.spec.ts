import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialListPageComponent } from './tutorial-list-page';

describe('TutorialListPageComponent', () => {
  let component: TutorialListPageComponent;
  let fixture: ComponentFixture<TutorialListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorialListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
