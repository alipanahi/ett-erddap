import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router) { }
  title = 'ett-erddap';

  changeRoute() {
    //console.log(this._router.url)
    let route = this._router.url
    if(route==='/graphs')
    {
      this._router.navigateByUrl('/menu')
    }else if(route==='/menu'){
      this._router.navigateByUrl('/graphs')
    }else if(route==='/menu-graph'){
      this._router.navigateByUrl('/graphs')
    }
  }
}
