import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor(public http: HttpClient) { }
  public getData(url:any): Observable<any>{
    
    return this.http.get<any>(url, {params: {}, responseType: 'text' as 'json'});
  }
}
