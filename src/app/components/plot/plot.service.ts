import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  constructor(public http: HttpClient) { }
  public getData(date:any): Observable<any>{
    let url = `https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?Fluoropore_Conc,Precipitazione_cumulata,time&time%3E=${date}`;
    
    return this.http.get<any>(url, {params: {}, responseType: 'text' as 'json'});
  }
}
