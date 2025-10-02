import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowScrollComponent } from './arrow-scroll';

describe('ArrowScrollComponent', () => {
  let component: ArrowScrollComponent;
  let fixture: ComponentFixture<ArrowScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowScrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
