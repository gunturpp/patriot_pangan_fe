import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams,ToastController } from "ionic-angular";
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
  constructor(
    public loading: LoadingProvider,
    public data: DataProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {}

  ionViewDidEnter() {
    console.log("ionViewDidLoad ReportPage");
    this.getFamilyByPatriot();
  }
  createReport() {
    this.navCtrl.setRoot('FormulirPage', {
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
      message: 'Gagal meminta data',
      duration: 3000,
    });
    toast.present();
  }
  getFamilyByPatriot() {
    this.loading.show();
    let temp = [];
    this.data.familyByPatriot(this.token).then(family => {
      this.dataFamily = family;
      if (this.dataFamily.status = true) {
        if (this.dataFamily != true) {
        this.family = this.dataFamily.data;
        console.log("family", this.family);
          for (var i = 0; i < this.family.length; i++) {
            temp[i] = this.family[i].rgn_subdistrict;
          }
          this.rgn_subdistrict = temp;
        }
        this.loading.hide();
      } else {
        console.log("gagal get api family by patriot");
        this.loading.hide();
      }
    });
  }
}
