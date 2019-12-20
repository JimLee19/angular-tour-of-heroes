import { TestBed } from '@angular/core/testing';

import { ModelFieldService } from './model-field.service';

describe('ModelFieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelFieldService = TestBed.get(ModelFieldService);
    expect(service).toBeTruthy();
  });
});
