import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIconComponent } from './list-icon';

describe('ListIconComponent', () => {
  let component: ListIconComponent;
  let fixture: ComponentFixture<ListIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
