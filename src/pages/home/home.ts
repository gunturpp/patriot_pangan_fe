import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Chart } from "chart.js";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("pieCanvas") pieCanvas;
  @ViewChild("barCanvas") barCanvas;
  pieChart: any;
  lineChart: any;
  barChart: any;
  constructor(public navCtrl: NavController) {}
  ionViewDidLoad() {
    this.pieChart = this.getPieChart();
    this.barChart = this.getBarChart();
    this.lineChart = this.getLineChart();
  }
  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType
    });
  }

  getPieChart() {
    let a = 10,
      b = 20,
      c = 30,
      d = 40,
      e = 50;
    let data = {
      labels: [
        "Rawan Pangan 1 : " + a + "%",
        "Rawan Pangan 2 : " + b + "%",
        "Rawan Pangan 3 : " + c + "%",
        "Rawan Pangan 4 : " + d + "%",
        "Rawan Pangan 5 : " + e + "%"
      ],
      datasets: [
        {
          data: [a, b, c, d, e],
          backgroundColor: ["green", "yellow", "pink", "red", "brown"],
          hoverBackgroundColor: ["green", "yellow", "pink", "red", "brown"]
        }
      ]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }
  getBarChart() {
    const data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getLineChart() {
    let data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Oktober",
        "November",
        "Desember"
      ],
      options: [{
        layout: {
            padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
      }],
      datasets: [
        {
          label: "Pergerakan setahun",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 1,
          pointRadius: 2,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40,12,2,44,15,10],
          spanGaps: true
        },
        
      ]
    };
    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }
}
