import { TestBed } from '@angular/core/testing';

import { TutorialApiService } from './tutorial-api';

describe('TutorialApiService', () => {
  let service: TutorialApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
