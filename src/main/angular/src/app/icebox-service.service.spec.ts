import { TestBed } from '@angular/core/testing';

import { IceboxServiceService } from './icebox-service.service';

describe('IceboxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IceboxServiceService = TestBed.get(IceboxServiceService);
    expect(service).toBeTruthy();
  });
});
