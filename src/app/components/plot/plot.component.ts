import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";

import { PlotService } from './plot.service';
HighchartsMore(Highcharts);

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  constructor(public PlotService: PlotService) { }
  precipitazione: Array<Array<any>> = []
  fluoropore: Array<Array<any>> = []

  wind_fluoropore_3:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_5:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_10:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_15:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_20:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_30:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore_40:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  wind_fluoropore:Array<Number> = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  categories= ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

  setData(data: any) {
    if (data) {
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          
          let date = new Date(child[2].textContent).getTime()
          this.fluoropore.push([date, Number(child[0].textContent)])
          this.precipitazione.push([date, Number(child[1].textContent)])
        }
      })
    }
    const chart = Highcharts.chart('chart-line', {
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
        title: {
          text: "Value"
        }
      }
      ,
      series: [
        {
          type: 'spline',
          name: 'fluoropore concentration',
          data: this.fluoropore,
          tooltip: {
            valueSuffix: ' µg/m3'
          }
        },
        {
          type: 'spline',
          name: 'Precipitazione cumulata',
          data: this.precipitazione,
          tooltip: {
            valueSuffix: ' mm'
          }
        }
      ]
    } as any)
    
  }
  setWindGraphData(data: any) {
    //console.log(data)
    if (data) {
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          let cardinal = child[1].textContent
          let cardinalIndex = this.categories.indexOf(cardinal)
          let fluo = Number(child[2].textContent)
          if(fluo<3){
            this.wind_fluoropore_3[cardinalIndex]=Number(this.wind_fluoropore_3[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo<5){
            this.wind_fluoropore_5[cardinalIndex]=Number(this.wind_fluoropore_5[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo < 10){
            this.wind_fluoropore_10[cardinalIndex]=Number(this.wind_fluoropore_10[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo < 15){
            this.wind_fluoropore_15[cardinalIndex]=Number(this.wind_fluoropore_15[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo < 20){
            this.wind_fluoropore_20[cardinalIndex]=Number(this.wind_fluoropore_20[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo < 30){
            this.wind_fluoropore_30[cardinalIndex]=Number(this.wind_fluoropore_30[cardinalIndex]) + Number(child[2].textContent)
          }else if(fluo < 40){
            this.wind_fluoropore_40[cardinalIndex]=Number(this.wind_fluoropore_40[cardinalIndex]) + Number(child[2].textContent)
          }else{
            this.wind_fluoropore[cardinalIndex]=Number(this.wind_fluoropore[cardinalIndex]) + Number(child[2].textContent)
          }
          
          //console.log(cardinalIndex)
          
        }
      })
    }
    //console.log(this.wind_fluoropore_3)
    Highcharts.chart('chart-wind', {

      chart: {
      polar: true,
      type: 'column'
    },
    title: {
      text: "Erdap",
      align: 'center'
    },
  
    subtitle: {
      text: 'Test Graph',
      align: 'center'
    },
    xAxis: {
      
      tickmarkPlacement: 'on',
      categories: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      
    },
    yAxis: {
      min: 0,
      endOnTick: false,
      reversedStacks: false,
      title: {
        text: 'Concentration (%)'
      },
    },
    tooltip: {
      valueSuffix: ' µg/m3'
    },
    
    legend: {
      align: 'right',
      verticalAlign: 'top',
      y: 100,
      layout: 'vertical'
    },
    plotOptions: {
      series: {
        stacking: 'normal',
        shadow: false,
        //groupPadding: 0,
        pointPlacement: 'on'
      }
    },
  
    series: [{
      
      
      name: '1-3 µg/m3',
      data: this.wind_fluoropore_3
    }, {
      
      name: '3-5 µg/m3',
      data: this.wind_fluoropore_5
    },{
      
      name: '5-10 µg/m3',
      data: this.wind_fluoropore_10
    },{
      
      name: '10-15 µg/m3',
      data: this.wind_fluoropore_15
    },{
      
      name: '15-20 µg/m3',
      data: this.wind_fluoropore_20
    },{
      
      name: '20-30 µg/m3',
      data: this.wind_fluoropore_30
    },{
      
      name: '30-40 µg/m3',
      data: this.wind_fluoropore_40
    },{
      
      name: '>40 µg/m3',
      data: this.wind_fluoropore
    }]
    } as any)

  }
  ngOnInit(): void {
    let url = 'https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?Fluoropore_Conc,Precipitazione_cumulata,time&time%3E=2015-05-23'
    this.PlotService.getData(url).subscribe(data => {

      let dataparser = new DOMParser();
      let xmlData = dataparser.parseFromString(data, "text/xml");
      let value = xmlData.getElementsByTagName("tr");
      this.setData(value)
      //console.log(value)

    })
    //wind rose graph
    let wind_url = 'https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?Direzione_prevalente_Deg%2CDirezione_prevalente%2CFluoropore_Conc&time%3E=2015-05-23'
    this.PlotService.getData(wind_url).subscribe(data => {

      let dataparser = new DOMParser();
      let xmlData = dataparser.parseFromString(data, "text/xml")
      let value = xmlData.getElementsByTagName("tr");
      this.setWindGraphData(value)
      //console.log(value)

    })
  }
}
