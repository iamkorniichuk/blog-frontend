import { TestBed } from '@angular/core/testing';

import { ImageCastService } from './image-cast';

describe('ImageCastService', () => {
  let service: ImageCastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
