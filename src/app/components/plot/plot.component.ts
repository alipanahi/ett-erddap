import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";

import { PlotService } from './plot.service';
import { Options } from 'highcharts/highcharts.src';
HighchartsMore(Highcharts);

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  constructor(public PlotService: PlotService) { }

  setData(data: any) {
    let precipitazione: Array<Array<any>> = []
    let fluoropore: Array<Array<any>> = []
    if (data) {
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children

          let date = new Date(child[2].textContent).getTime()
          fluoropore.push([date, Number(child[0].textContent)])
          precipitazione.push([date, Number(child[1].textContent)])
        }
      })
    }
    Highcharts.chart('chart-line', {
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
        }
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
          data: fluoropore,
          tooltip: {
            valueSuffix: ' µg/m3'
          }
        },
        {
          type: 'spline',
          name: 'Precipitazione cumulata',
          data: precipitazione,
          tooltip: {
            valueSuffix: ' mm'
          }
        }
      ]
    } as any)

  }
  setWindGraphData(data: any) {
    //console.log(data)
    let categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    let allSeries:Array<any> = []
    let legend_data:Array<any> = [
      //fill the data array with default value 0 as many as categories lenght
      {name: '1-3',data:Array(categories.length).fill(0)},
      {name: '3-5',data:Array(categories.length).fill(0)},
      {name: '5-10',data:Array(categories.length).fill(0)},
      {name: '10-15',data:Array(categories.length).fill(0)},
      {name: '15-20',data:Array(categories.length).fill(0)},
      {name: '20-30',data:Array(categories.length).fill(0)},
      {name: '30-40',data:Array(categories.length).fill(0)},
      {name: '>= 40',data:Array(categories.length).fill(0)}
    ]

    if (data) {
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          let cardinal = child[1].textContent
          let cardinalIndex = categories.indexOf(cardinal)
          let fluo = Number(child[2].textContent)
          
          if (fluo < 3) {
            legend_data[0].data[cardinalIndex] = Number(legend_data[0].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 5) {
            legend_data[1].data[cardinalIndex] = Number(legend_data[1].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 10) {
            legend_data[2].data[cardinalIndex] = Number(legend_data[2].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 15) {
            legend_data[3].data[cardinalIndex] = Number(legend_data[3].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 20) {
            legend_data[4].data[cardinalIndex] = Number(legend_data[4].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 30) {
            legend_data[5].data[cardinalIndex] = Number(legend_data[5].data[cardinalIndex]) + Number(child[2].textContent)
          } else if (fluo < 40) {
            legend_data[6].data[cardinalIndex] = Number(legend_data[6].data[cardinalIndex]) + Number(child[2].textContent)
          } else {
            legend_data[7].data[cardinalIndex] = Number(legend_data[7].data[cardinalIndex]) + Number(child[2].textContent)
          }
        }
      })
    }
    if(legend_data.length>0){
      //push all generated data to series
      legend_data.forEach((item:any)=>{
        allSeries.push({
          name: item.name,
          data: item.data
        })
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
        categories: categories

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

      series: allSeries
    } as any)

  }
  setStackedGraphData(data: any) {
    let stacked_dates: Array<any> = []
    let allSeries:Array<any> = []
    let percentage:Array<any> = []
    let fluoropore_stacked: Array<Number> = []

    if (data) {
      //array of legend data base on headers
      Array.from(data[0].getElementsByTagName('th')).forEach((th:any,i:number)=>{
        if(i > 1){//the first index is date and the second index is concentration, so ignore it
          percentage.push({name: th.textContent,data:[]})
        }
      })
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          //array of dates for xAxis
          let date = new Date(child[0].textContent).getTime()
          stacked_dates.push(date)
          //array of concentration data for line graph
          fluoropore_stacked.push(Number(child[1].textContent))
          //for every row, update the percentage value according to its corresponding index
          percentage.forEach((tr:any,i:number)=>{
            tr.data.push(Number(child[i+2].textContent))
          })
        }
      })
    }
    //console.log(percentage)
    if(percentage.length>0){
      //push all the generated data to series
      percentage.forEach((item:any)=>{
        allSeries.push({
          name: item.name,
          type: 'column',
          yAxis: 1,
          data: item.data,
          tooltip: {
            valueSuffix: ' %'
          }
    
        })
      })
    }
    //push the line graph to series
    allSeries.push({
      name: 'Concentration',
      type: 'spline',
      data: fluoropore_stacked,
      tooltip: {
        valueSuffix: 'µg/m3'
      }
    })
    
    Highcharts.chart('chart-stacked', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'Sacked Column Graph',
        align: 'center'
      },
      subtitle: {
        text: 'Source: Erddap'
      },
      xAxis: [{
        categories: stacked_dates,
        crosshair: true,
        type: 'datetime',
        labels: {
          format: '{value:%Y-%b-%e}'
        }
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} µg/m3',

        },
        title: {
          text: 'Concentration',

        }
      }, { // Secondary yAxis
        title: {
          text: 'Precentage',

        },
        labels: {
          format: '{value} %',

        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'right',
        //x: 80,
        verticalAlign: 'top',
        y: 100,
        floating: false,
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
      series: allSeries
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
    //stacked columns graph
    let stacked_url = 'https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?time%2CFluoropore_Conc%2COC_percentage%2CEC_percentage%2CLevo_percentage%2CNO3_percentage%2CSO4_percentage%2CNH4_percentage%2CNa_percentage%2CMg_percentage%2CCl_percentage%2CK_percentage%2CCa_percentage%2CFe_percentage&time%3E=2015-05-23'
    this.PlotService.getData(stacked_url).subscribe(data => {

      let dataparser = new DOMParser();
      let xmlData = dataparser.parseFromString(data, "text/xml")
      let value = xmlData.getElementsByTagName("tr");
      this.setStackedGraphData(value)
      //console.log(value)

    })
  }
}
