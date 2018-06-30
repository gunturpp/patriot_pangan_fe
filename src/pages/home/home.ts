import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, ToastController, IonicPage } from "ionic-angular";
import { Chart } from "chart.js";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";

import "rxjs/add/operator/map";
declare var google: any;

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("mapContainer") mapRef: ElementRef;
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("pieCanvas") pieCanvas;
  // @ViewChild("barCanvas") barCanvas;

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
    public toastCtrl: ToastController
  ) {}
  ionViewDidLoad() {
    // welcome
    this.token = localStorage.getItem("tokenPatriot");
    this.getDataKecamatanByMonth();
    setTimeout(() => {
      this.displayGoogleMap();
      this.getMarkers();
    }, 200);
  }
  ionViewDidEnter() {
    this.getCurrentUser();
    this.pieChart = this.getPieChart();
    // this.barChart = this.getBarChart();
    this.lineChart = this.getLineChart();
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: "Gagal meminta data",
      duration: 3000
    });
    toast.present();
  }
  tokenExpiredToast() {
    const toast = this.toastCtrl.create({
      message: "Token kadaluarsa, silahkan login kembali",
      duration: 3000
    });
    toast.present();
  }
  getCurrentUser() {
    this.loadingProvider.show();
    this.data
      .currentUser(this.token)
      .then(user => {
        this.dataUser = user;
        console.log("data user",this.dataUser);
        if (this.dataUser.status == 200 || this.dataUser.status == true) {
          this.loadingProvider.hide();
          console.log("dayday",this.dataUser.json().status);
          
          if(this.dataUser.json().status == false) {
            localStorage.clear();
            this.navCtrl.parent.parent.setRoot("LoginPage");
            this.tokenExpiredToast();  
          }
        } else {
          localStorage.clear();
          this.navCtrl.parent.parent.setRoot("LoginPage");
          this.tokenExpiredToast();
        }
      })
      .catch(err => {
        console.log("terjadi error", err);
        this.loadingProvider.hide();
        this.failToast();
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
          backgroundColor: [
            "green",
            "greenyellow",
            "yellow",
            "red",
            "maroon"
            // pattern.draw('hijautua', '#00aa00'),
            // pattern.draw('hijau', '#00ff00'),
            // pattern.draw('kuning', '#ffff00'),
            // pattern.draw('merah', '#ff0000'),
            // pattern.draw('merahtua', '#aa0000'),
          ],
          hoverBackgroundColor: [
            "green",
            "greenyellow",
            "yellow",
            "red",
            "maroon"
            // pattern.draw('hijautua', '#00aa00'),
            // pattern.draw('hijau', '#00ff00'),
            // pattern.draw('kuning', '#ffff00'),
            // pattern.draw('merah', '#ff0000'),
            // pattern.draw('merahtua', '#aa0000'),
          ]
        }
      ]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }
  // getBarChart() {
  //   const data = {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [
  //       {
  //         label: "Pergerakan setahun",
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)"
  //         ],
  //         borderColor: [
  //           "rgba(255,99,132,1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)"
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   };

  //   const options = {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }
  //       ]
  //     }
  //   };

  //   return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
  // }
  getDataKecamatanByMonth() {
    this.http.get("assets/json/kecamatanLine.json").subscribe(data => {
      console.log("taraf rawan kecamatan perbulan", data.json());
    });
  }
  getLineChart() {
    let data: any;
    let kecamatan = [
      {
        color: [
          "#00aa00",
          "#adff2f",
          "#ffff00",
          "#ff0000",
          "#b03060",
          "#00aa00",
          "#adff2f",
          "#ffff00",
          "#ff0000",
          "#b03060",
          "#ffff00",
          "#ff0000"
        ]
      }
    ];
    for (var x = 0; x < 12; x++) {
      data = {
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
            // layout: {
            //   padding: {
            //     left: 50,
            //     right: 0,
            //     top: 0,
            //     bottom: 0
            //   }
            // },
            scales: {
              yAxes: [
                {
                  type: "myScale",
                  name: "hahahah" // this is the same key that was passed to the registerScaleType function
                }
              ]
            }
          }
        ],
        datasets: [
          {
            label: "Taraf Kerawanan",
            fill: false,
            lineTension: 0.1,
            // backgroundColor: "#000",
            borderColor: "#000",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: [
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#ffff00",
              "#ff0000"
            ],
            pointBackgroundColor: [
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#ffff00",
              "#ff0000"
            ],
            pointBorderWidth: 5,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: [
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#ffff00",
              "#ff0000"
            ],
            pointHoverBorderColor: [
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#00aa00",
              "#adff2f",
              "#ffff00",
              "#ff0000",
              "#b03060",
              "#ffff00",
              "#ff0000"
            ],
            pointHoverBorderWidth: 1,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 5, 2],
            spanGaps: true
          }
        ]
      };
    }
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
      }), err => {
        alert("get marker error");
      };
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
        animation: google.maps.Animation.DROP
      });
      // hijauTua hijau kuning merah merahTua
      // 00aa00 adff2f ffff00 ff0000 b03060
      if (marker.color == "b03060" || marker.color == "ff0000") {
        dogwalkMarker.addListener(
          "click",
          dogwalkMarker.setAnimation(google.maps.Animation.BOUNCE)
        );
      }

      // infowindows
      // console.log("detail", marker.details);
      dogwalkMarker.setMap(this.map);
      // var infowindow = new google.maps.InfoWindow({
      //   content: "wow"
      //   // content: marker.details
      // });
      // dogwalkMarker.addListener("click", function() {
      //   infowindow.open(this.map, dogwalkMarker);
      // });
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
