import { TestBed } from '@angular/core/testing';

import { CategorydetailsService } from './categorydetails.service';

describe('CategorydetailsService', () => {
  let service: CategorydetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorydetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
