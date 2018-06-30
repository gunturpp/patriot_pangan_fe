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

  private dataSummary: any;
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
  ) {
    this.token = localStorage.getItem("tokenPatriot");
  }
  ionViewDidLoad() {
    this.getDataSummary()
    .then((data)=>{
      this.dataSummary = data;
      setTimeout(() => {
        this.displayGoogleMap();
        this.addMarkersToMap(this.dataSummary.listkecamatan);
      }, 200);

      //add chart
      this.pieChart = this.getPieChart(this.dataSummary);
    })
  }
  ionViewDidEnter() {
    this.getCurrentUser();
  }
  getDataSummary(){
    return new Promise((resolve, reject)=>{
      let url = this.data.BASE_URL+'summary/getkondisirawanbylokasi';
      this.data.get(url, this.token)
      .subscribe(dataResponse =>{
        let data: any = dataResponse;
        console.log('Berhasil get data summary anjay', data.data);
        resolve(data.data)
      }, err =>{
        alert(err)
      })
    })

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
  getPieChart(summary) {
    console.log('data piechart ', summary);

    let a = summary.kondisi[1],
      b = summary.kondisi[2],
      c = summary.kondisi[3],
      d = summary.kondisi[4],
      e = summary.kondisi[5],
      f = summary.totalkecamatan - (a+b+c+d+e) //rawan total
    
    let color = this.data.COLOR_RAWAN.map(rawan =>{
      return rawan.color
    })
    console.log('data f '+ f + 'data color 2 '+color[2])
    let data = {
      labels: [
        "Aman    : " + Math.round(f/summary.totalkecamatan*100).toFixed(2) + "%",
        "Rawan 1 : " + Math.round(a/summary.totalkecamatan*100).toFixed(2) + "%",
        "Rawan 2 : " + Math.round(b/summary.totalkecamatan*100).toFixed(2) + "%",
        "Rawan 3 : " + Math.round(c/summary.totalkecamatan*100).toFixed(2) + "%",
        "Rawan 4 : " + Math.round(d/summary.totalkecamatan*100).toFixed(2) + "%",
        "Rawan 5 : " + Math.round(e/summary.totalkecamatan*100).toFixed(2) + "%"
      ],
      datasets: [
        {
          data: [f, a, b, c, d, e],
          backgroundColor: [
            '#'+color[0],
            '#'+color[1],
            '#'+color[2],
            '#'+color[3],
            '#'+color[4],
            '#'+color[5]
          ],
          hoverBackgroundColor: [
            '#'+color[0],
            '#'+color[1],
            '#'+color[2],
            '#'+color[3],
            '#'+color[4],
            '#'+color[5]
          ]
        }
      ]
    };
    
    return this.getChart(this.pieCanvas.nativeElement, "pie", data);
  }

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
    console.log('lat ', this.dataSummary.kabupaten.lat)
    let coordinateDramaga = { lat: this.dataSummary.kabupaten.lat, lng: this.dataSummary.kabupaten.lng };

    let mapOptions = {
      center: coordinateDramaga,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.terrain
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    var marker = new google.maps.Marker({
      position: coordinateDramaga,
      map: this.map,
      label: this.dataSummary.kabupaten.nama
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
    let url = this.data.BASE_URL+'summary/getkondisirawanbylokasi';
    this.data.get(url, this.token)
    .subscribe( dataResponse =>{
      let data: any = dataResponse;
      console.log('Berhasil get data summary ', data.data);
      //data summary
      this.dataSummary = data.data;
      //draw marker 
      this.addMarkersToMap(this.dataSummary.listkecamatan);
    }, err =>{
      alert(JSON.stringify(err))
    })
  }

  addMarkersToMap(markers) {// markers means list region that will be marked
    for (let marker of markers) {

      //find the tipe rawan
      var tipeRawan = this.data.COLOR_RAWAN.filter( rawan => {
        return rawan.id == marker.kondisi; // return arr of object by condition
      })

      var iconNew = {
        url:
          "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+tipeRawan[0].color,// url        labelOrigin: new google.maps.Point(14, 45)
      };
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      // plot marker
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        label: marker.name,
        icon: iconNew,
        animation: google.maps.Animation.DROP
      });

      if (tipeRawan[0].color == "b03060" || tipeRawan[0].color == "ff0000") { // set the marker of rawan4&5 to bounce
        dogwalkMarker.setAnimation(google.maps.Animation.BOUNCE)
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

  /**
   * page function
   */
  coba(){
    let url = this.data.BASE_URL+'keluargamiskin/getdetailkeluargamiskin/5';
    this.data.get(url, this.token)
    .subscribe(data =>{
      console.log('berhasil get detail keluarga miskin ', data);
    })
  }
}
