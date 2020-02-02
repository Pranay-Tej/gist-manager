/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GistServiceService } from './gist-service.service';

describe('Service: GistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GistServiceService]
    });
  });

  it('should ...', inject([GistServiceService], (service: GistServiceService) => {
    expect(service).toBeTruthy();
  }));
});
