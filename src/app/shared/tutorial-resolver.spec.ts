import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tutorialResolver } from './tutorial-resolver';
import { Tutorial } from '../services/tutorial-api';

describe('tutorialResolver', () => {
  const executeResolver: ResolveFn<Tutorial> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tutorialResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
