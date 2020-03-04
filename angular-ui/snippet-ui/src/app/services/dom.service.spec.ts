/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DomService } from './dom.service';

describe('Service: Dom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomService]
    });
  });

  it('should ...', inject([DomService], (service: DomService) => {
    expect(service).toBeTruthy();
  }));
});
