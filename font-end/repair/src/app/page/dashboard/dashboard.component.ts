import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { mainService } from 'src/app/service/main.service';
declare const Chart: any;
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  report_request: any
  reportData: any = {}
  reportRepair: any = {}
  report_equipment: any;
  report_last_req: any;
  dataChart: any = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgb(90, 90, 90)',
          'rgba(255, 99, 12, 0.9)',
          'rgb(60, 179, 113)',
          'rgba(255, 22, 12, 0.9)',
          'rgb(0, 125, 0)',
          'rgba(0, 255, 12, 0.9)',
        ],
        borderColor: [
          'rgb(90, 90, 90)',
          'rgba(255, 99, 12, 0.9)',
          'rgb(60, 179, 113)',
          'rgba(255, 22, 12, 0.9)',
          'rgb(0, 125, 0)',
          'rgba(0, 255, 12, 0.9)',
        ],
        borderWidth: 1,
      },
    ],
  }

  dataChart1: any = {
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          'rgb(90, 90, 90)',
          'rgba(255, 99, 12, 0.9)',
          'rgb(60, 179, 113)',
          'rgba(255, 22, 12, 0.9)',
          'rgb(0, 125, 0)',
          'rgba(0, 255, 12, 0.9)',

        ],
        borderColor: [
          'rgb(90, 90, 90)',
          'rgba(255, 99, 12, 0.9)',
          'rgb(60, 179, 113)',
          'rgba(255, 22, 12, 0.9)',
          'rgb(0, 125, 0)',
          'rgba(0, 255, 12, 0.9)',
        ],
        borderWidth: 1,
      },
    ],
  }
  opt: any = {
    responsive: true,
    plugins: {
      labels: {
        render: 'value',
        precision: 0,
        showZero: true,
        fontSize: 20,
        fontColor: '#fff',
        fontStyle: 'normal',
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        textShadow: true,
        shadowBlur: 10,
        shadowOffsetX: -5,
        shadowOffsetY: 5,
        shadowColor: 'rgba(255,0,0,0.75)',
        position: 'default',
        overlap: true,
        showActualPercentages: true,
        outsidePadding: 4,
        textMargin: 4
      }
    }
  }

  constructor(private mainService: mainService) { }

  ngOnInit(): void {
    this.mainService.report_request().then((res => {
      this.reportData = res
      this.dataChart.labels = this.reportData.status_name
      this.dataChart.datasets[0].data = this.reportData.count
    })).catch(err => {
      console.log(err)
    })

    this.mainService.report_repair().then((res => {
      this.reportRepair = res
      this.dataChart1.labels = this.reportRepair.status_name
      this.dataChart1.datasets[0].data = this.reportRepair.count
    })).catch(err => {
      console.log(err)
    })

    this.mainService.get_request_equipment().then((res => {
      this.report_equipment = res
    })).catch(err => {
      console.log(err)
    })

    this.mainService.report_last_request().then((res => {
      this.report_last_req = res
    })).catch(err => {
      console.log(err)
    })
  }
}


