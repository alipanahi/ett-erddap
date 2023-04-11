import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import { PlotComponent } from '../plot/plot.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClient,HttpHandler,HttpHeaders } from '@angular/common/http';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperComponent,PlotComponent ],
      providers: [HttpClient,HttpHandler],
      imports: [HighchartsChartModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
