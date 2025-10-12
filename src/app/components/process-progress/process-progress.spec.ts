import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessProgressComponent } from './process-progress';

describe('ProcessProgressComponent', () => {
  let component: ProcessProgressComponent;
  let fixture: ComponentFixture<ProcessProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
