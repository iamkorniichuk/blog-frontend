import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TocMarkdownComponent } from './toc-markdown';

describe('TocMarkdownComponent', () => {
  let component: TocMarkdownComponent;
  let fixture: ComponentFixture<TocMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TocMarkdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TocMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
