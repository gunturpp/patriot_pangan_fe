import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormulirPage } from "../formulir/formulir";
import { DataProvider } from "../../providers/data/data";
import { LoginPage } from "../login/login";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-report",
  templateUrl: "report.html"
})
export class ReportPage {
  token = localStorage.getItem("tokenPatriot");
  family: any = [];
  dataFamily: any;
  idFamily: any;
  rgn_subdistrict = [];
  user: any;
  userTemp: any;
  month:any;
  dayLeft: number;
  constructor(
    public loading: LoadingProvider,
    public data: DataProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {}
  ionViewDidLoad() {
    this.getMonth();
    this.getMonthDaysLeft();
  }
  ionViewDidEnter() {
    this.getCurrentUser();
    console.log("ionViewDidLoad ReportPage");
    this.getFamilyByPatriot();
  }
  getMonthDaysLeft(){
    let date;
    date = new Date();
    this.dayLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();
    console.log("dayleft", this.dayLeft);
}
  getMonth() {
    this.month =new Date().getMonth();
    console.log("bulan", new Date().getMonth());
  }
  getCurrentUser() {
    this.loading.show();
    this.data
      .currentUser(this.token)
      .then(user => {
        this.userTemp = user;
        console.log(this.userTemp);
        if (this.userTemp.status == 200 || this.userTemp.status == true ) {
          this.user = this.userTemp.json().data;
          this.loading.hide();
        } else {
          localStorage.clear();
          this.navCtrl.parent.parent.setRoot("LoginPage");
          this.tokenExpiredToast();
        }
      })
      .catch(err => {
        alert("Terjadi kesalahan, silahkan coba kembali");
        console.log("terjadi error", err);
        this.loading.hide();
        this.failToast();
        this.navCtrl.setRoot('TabsPage');
      });
  }
  createReport() {
    this.navCtrl.setRoot("FormulirPage", {
      idFamily: this.idFamily
    });
    // hide tabs
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(26px)";
        tabs[key].style.display = "none";
      });
    } // end if
  }
  returnId(idFamily) {
    console.log("id", idFamily);
    this.idFamily = idFamily;
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: "Gagal meminta data",
      duration: 3000
    });
    toast.present();
  }
  getFamilyByPatriot() {
    this.loading.show();
    let temp = [];
    this.data
      .familyByPatriot(this.token)
      .then(family => {
        this.dataFamily = family;
        console.log("data family", this.dataFamily);
        if ((this.dataFamily.status = 200)) {
          this.family = this.dataFamily.json().data;
          console.log("family", this.family);
          for (var i = 0; i < this.family.length; i++) {
            temp[i] = this.family[i].rgn_subdistrict;
            
          }
          this.rgn_subdistrict = temp;
          this.loading.hide();
        } else {
          console.log("gagal get api family by patriot");
          this.loading.hide();
        }
      })
      .catch(err => {
        alert("terjadi kesalahan, silahkan coba kembali");
        console.log("error get family by patriot", err);
        this.navCtrl.parent.parent.setRoot('LoginPage');
        this.tokenExpiredToast();
        localStorage.clear();
      });
  }
  tokenExpiredToast() {
    const toast = this.toastCtrl.create({
      message: "Token kadaluarsa, silahkan login kembali",
      duration: 3000
    });
    toast.present();
  }
}
