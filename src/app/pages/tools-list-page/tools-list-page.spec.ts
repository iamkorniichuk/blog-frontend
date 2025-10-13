import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsListPageComponent } from './tools-list-page';

describe('ToolsListPageComponent', () => {
  let component: ToolsListPageComponent;
  let fixture: ComponentFixture<ToolsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
