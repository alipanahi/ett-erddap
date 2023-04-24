import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuGraphComponent } from './components/menu-graph/menu-graph.component';

const routes: Routes = [
  { path: 'graphs',title:'Main page', component: WrapperComponent },
  { path: 'menu', title:'Menu page', component: MenuComponent },
  { path: 'menu-graph', title:'Menu Graph', component: MenuGraphComponent },
  { path: 'menu-graph/:params', title:'Menu Graph', component: MenuGraphComponent },
  { path: '',   redirectTo: '/graphs', pathMatch: 'full' },
  //{ path: '**', component: WrapperComponent },  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
