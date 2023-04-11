import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotComponent } from './plot.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClient,HttpHandler,HttpHeaders } from '@angular/common/http';

describe('PlotComponent', () => {
  let component: PlotComponent;
  let fixture: ComponentFixture<PlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotComponent ],
      providers: [HttpClient, HttpHandler],
      imports: [HighchartsChartModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
