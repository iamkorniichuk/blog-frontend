import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReplacePageComponent } from './text-replace-page';

describe('TextReplacePageComponent', () => {
  let component: TextReplacePageComponent;
  let fixture: ComponentFixture<TextReplacePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextReplacePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextReplacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
