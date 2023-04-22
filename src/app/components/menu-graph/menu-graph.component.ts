import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { PlotService } from '../plot/plot.service';

@Component({
  selector: 'app-menu-graph',
  templateUrl: './menu-graph.component.html',
  styleUrls: ['./menu-graph.component.css']
})
export class MenuGraphComponent implements OnInit {
  constructor(private _router: Router, private PlotService: PlotService, private actRoute: ActivatedRoute) { }
  public params: any

  setcolumnGraphData(data: any) {
    let stacked_dates: Array<any> = []
    let allSeries: Array<any> = []
    let percentage: Array<any> = []

    if (data) {
      //array of legend data base on headers
      Array.from(data[0].getElementsByTagName('th')).forEach((th: any, i: number) => {
        if (i > 0) {//the first index is date, so ignore them
          percentage.push({ name: th.textContent, data: [] })
        }
      })
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          //array of dates for xAxis
          let date = new Date(child[0].textContent).getTime()
          stacked_dates.push(date)

          //for every row, update the percentage data array for all percentages available
          percentage.forEach((th: any, i: number) => {
            let value_percentage = Number(child[i + 1].textContent)
            //console.log(value_percentage)
            th.data.push(Number(value_percentage))
          })
        }
      })
    }
    //console.log(percentage)
    if (percentage.length > 0) {
      //push all the generated data to series
      percentage.forEach((item: any) => {
        allSeries.push({
          name: item.name,
          type: 'column',
          data: item.data,


        })
      })
    }

    Highcharts.chart('chart', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'ErdDap air quality - Column Graph',
        align: 'center'
      },
      subtitle: {
        text: 'Source: www.dss-geremia.it'
      },
      xAxis: [{
        categories: stacked_dates,
        crosshair: true,
        type: 'datetime',
        labels: {
          format: '{value:%Y-%b-%e}'
        }
      }],
      yAxis: [{ // Secondary yAxis
        title: {
          text: 'Precentage',

        },
        labels: {
          format: '{value}',

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
  setLinearData(data: any) {

    let allSeries: Array<any> = []
    let percentage: Array<any> = []
    if (data) {
      //array of legend data base on headers
      Array.from(data[0].getElementsByTagName('th')).forEach((th: any, i: number) => {
        if (i > 0) {//the first index is date, so ignore them
          percentage.push({ name: th.textContent, data: [] })
        }
      })
      Array.from(data).forEach((item: any, index: number) => {
        if (index > 1) {//ignore the first 2 rows, as they are headers
          let child = item.children
          //array of dates for xAxis
          let date = new Date(child[0].textContent).getTime()

          //for every row, update the percentage data array for all percentages available
          percentage.forEach((th: any, i: number) => {
            let value_percentage = Number(child[i + 1].textContent)
            //console.log(value_percentage)
            th.data.push([date, Number(value_percentage)])
          })
        }
      })

    }
    if (percentage.length > 0) {
      //push all the generated data to series
      percentage.forEach((item: any) => {
        allSeries.push({
          name: item.name,
          type: 'spline',
          data: item.data,


        })
      })
    }
    Highcharts.chart('chart', {
      chart: {
        type: "spline"
      },
      title: {
        text: "ErdDap air quality - Linear Graph"
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
      series: allSeries
    } as any)

  }
  ngOnInit(): void {
    document.getElementById('switch_btn')!.innerHTML = "Go to main page"

    this.params = history.state.data
    let url = 'https://www.dss-geremia.it/erddap/tabledap/pmten_air_monitoring.xhtml?time'
    this.params.forEach((item: any) => {
      url += `%2C` + item
    })
    //console.log(history.state.graph)
    this.PlotService.getData(url).subscribe(data => {
      let dataparser = new DOMParser();
      let xmlData = dataparser.parseFromString(data, "text/xml")
      let value = xmlData.getElementsByTagName("tr");
      if (history.state.graph == 'column') {
        this.setcolumnGraphData(value)
      } else {
        this.setLinearData(value)
      }

    })
  }
}
