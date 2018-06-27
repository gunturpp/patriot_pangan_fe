import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Chart } from "chart.js";
import { Http } from "@angular/http";
import pattern from "patternomaly";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";

import "rxjs/add/operator/map";
import { LoginPage } from "../login/login";
declare var google: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("mapContainer") mapRef: ElementRef;
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("pieCanvas") pieCanvas;
  @ViewChild("barCanvas") barCanvas;

  map: any;
  pieChart: any;
  lineChart: any;
  barChart: any;
  token: any;
  dataUser: any;
  user: any;
  constructor(
    public loadingProvider: LoadingProvider,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
  ) {}
  ionViewDidLoad() {
    this.token = localStorage.getItem("tokenPatriot");
    this.getCurrentUser();
    this.pieChart = this.getPieChart();
    this.barChart = this.getBarChart();
    this.lineChart = this.getLineChart();
    setTimeout(() => {
      this.displayGoogleMap();
      this.getMarkers();
    }, 200);
  }
  getCurrentUser() {
    this.loadingProvider.show();
    this.data
      .currentUser(this.token)
      .then(user => {
        this.loadingProvider.hide();
        this.dataUser = user;
        this.user = this.dataUser.data;
        console.log("user profile", this.user);
        if (this.user == "undefined") {
          localStorage.removeItem("tokenPatriot");
          this.navCtrl.setRoot(LoginPage);
        }
        localStorage.setItem("currentUserPatriot", JSON.stringify(this.user));
      })
      .catch(err => {
        console.log("terjadi error", err);
        this.loadingProvider.hide();
      });
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
          backgroundColor: [ "green","greenyellow","yellow","red","maroon"
            // pattern.draw('hijautua', '#00aa00'),
            // pattern.draw('hijau', '#00ff00'),
            // pattern.draw('kuning', '#ffff00'),
            // pattern.draw('merah', '#ff0000'),
            // pattern.draw('merahtua', '#aa0000'),
          ],
          hoverBackgroundColor: [
            "green","greenyellow","yellow","red","maroon"
            // pattern.draw('hijautua', '#00aa00'),
            // pattern.draw('hijau', '#00ff00'),
            // pattern.draw('kuning', '#ffff00'),
            // pattern.draw('merah', '#ff0000'),
            // pattern.draw('merahtua', '#aa0000'),
          ],
        }
      ]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }
  getBarChart() {
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Pergerakan setahun",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
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
      options: [
        {
          layout: {
            padding: {
              left: 50,
              right: 0,
              top: 0,
              bottom: 0
            }
          }
        }
      ],
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
          data: [65, 59, 80, 81, 56, 55, 40, 12, 2, 44, 15, 10],
          spanGaps: true
        }
      ]
    };
    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }
  displayGoogleMap() {
    let coordinateDramaga = { lat: -6.578127, lng: 106.731268 };

    let mapOptions = {
      center: coordinateDramaga,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.terrain
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    var marker = new google.maps.Marker({
      position: coordinateDramaga,
      map: this.map,
      label: "Kecamatan Dramaga"
    });
    // keterangan
    var contentString = "Dramaga adalah daerah macet phew phew~";
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener("click", function() {
      infowindow.open(this.map, marker);
    });
  }
  getMarkers() {
    this.http
      .get("assets/json/marker.json")
      .map(res => res.json())
      .subscribe(data => {
        // console.log("data", data);
        this.addMarkersToMap(data);
      });
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      // console.log("marks", marker);
      var iconNew = {
        url:
          "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" +
          marker.color // url
        // scaledSize: new google.maps.Size(20, 20), // scaled size
        // origin: new google.maps.Point(0, 0), // origin
        // anchor: new google.maps.Point(0, 10) // anchor
      };
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        label: marker.name,
        icon: iconNew,
        animation: google.maps.Animation.DROP,
      });
      // hijauTua hijau kuning merah merahTua
      // 00aa00 adff2f ffff00 ff0000 b03060
      if(marker.color == "b03060" || marker.color == "ff0000" ) {
        dogwalkMarker.addListener('click',  dogwalkMarker.setAnimation(google.maps.Animation.BOUNCE));
      }
     
      // infowindows
      // console.log("detail", marker.details);
      dogwalkMarker.setMap(this.map);
      var infowindow = new google.maps.InfoWindow({
        content: "wow"
        // content: marker.details
      });
      dogwalkMarker.addListener("click", function() {
        infowindow.open(this.map, dogwalkMarker);
      });
      // polygone
      // var flightPath = new google.maps.Polygon({
      //   path: marker.polygone,
      //   geodesic: true,
      //   strokeColor: "#000000",
      //   strokeOpacity: 1.0,
      //   strokeWeight: 2,
      //   fillColor: marker.color,
      //   fillOpacity: 0.4
      // });
      // flightPath.setMap(this.map);
    }
  }
}
