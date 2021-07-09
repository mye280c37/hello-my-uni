import { TestBed } from '@angular/core/testing';

import { ConsultingDateService } from './consulting-date.service';

describe('ConsultingDateService', () => {
  let service: ConsultingDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultingDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
