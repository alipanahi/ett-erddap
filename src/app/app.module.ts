import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PlotComponent } from './components/plot/plot.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MenuComponent } from './components/menu/menu.component';
import { MenuGraphComponent } from './components/menu-graph/menu-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    PlotComponent,
    MenuComponent,
    MenuGraphComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
