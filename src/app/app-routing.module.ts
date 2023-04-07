import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PlotComponent } from './components/plot/plot.component';

const routes: Routes = [
  { path: 'main',title:'Main page', component: WrapperComponent },
  { path: 'plot', title:'Graphs', component: PlotComponent },
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  //{ path: '**', component: WrapperComponent },  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
