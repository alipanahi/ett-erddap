import { TestBed } from '@angular/core/testing';

import { PlotService } from './plot.service';
import { HttpClient,HttpHandler,HttpHeaders } from '@angular/common/http';

describe('PlotService', () => {
  let service: PlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(PlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
