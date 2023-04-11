import { Component,OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { PlotService } from './plot.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  constructor(public PlotService: PlotService){}
  precipitazione:Array<Array<any>>=[]
  fluoropore:Array<Array<any>>=[]
  updateFlag = false;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options = {
    chart: {
      type: "spline"
   },
   title: {
      text: "air quality of Genoa 'Porto antico'"
   },
   subtitle: {
      text: "Source: www.dss-geremia.it"
   },
   xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%Y-%b-%e}'
    },
  },
   yAxis: {          
      title:{
         text:"Value"
      } 
   }
  ,
  series: [
    {
      type: 'spline',
        name: 'fluoropore concentration',
        data: [],
        tooltip: {
          valueSuffix: ' µg/m3'
        }
    },
    {
      type: 'spline',
        name: 'Precipitazione cumulata',
        data: [],
        tooltip: {
          valueSuffix: ' mm'
        }
    }
  ]
};
setData(data:any){
  if(data){
    Array.from(data).forEach((item:any,index:number)=>{
      if(index>1){//ignore the first 2 rows, as they are headers
        let child = item.children
        let date = new Date(child[2].textContent).getTime()
        this.fluoropore.push([date,Number(child[0].textContent)])
        this.precipitazione.push([date,Number(child[1].textContent)])
      }
    })
    //console.log(this.precipitazione)
    this.chartOptions.series = [{
        type: 'spline',
        name: 'fluoropore concentration',
        data: this.fluoropore
      },
      {
        type: 'spline',
        name: 'Precipitazione cumulata',
        data: this.precipitazione
      }
    ]
    this.updateFlag = true
  }
}
ngOnInit(): void {
  
  this.PlotService.getData('2015-05-23').subscribe(data=>{
    
    let dataparser = new DOMParser();
    let xmlData = dataparser.parseFromString(data,"text/xml");
    let value = xmlData.getElementsByTagName("tr");
    this.setData(value)
    //console.log(value)
    
  })
}
}
