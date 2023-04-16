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
    console.log(this._router.url)
    if(this._router.url==='/graphs')
    {
      this._router.navigateByUrl('/menu')
    }else{
      this._router.navigateByUrl('/graphs')
    }
  }
}
