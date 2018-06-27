import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
    public loadingProvider: LoadingProvider,
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReportPage");
    this.getFamilyByPatriot();
  }
  createReport() {
    this.navCtrl.setRoot(FormulirPage, {
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
  getFamilyByPatriot() {
    this.loadingProvider.show();
    this.data.familyByPatriot(this.token).then(family => {
      let temp = [];
      this.dataFamily = family;
      if (this.dataFamily.status == false) {
        this.navCtrl.parent.parent.setRoot(LoginPage);
        localStorage.removeItem("tokenPatriot");
        this.loadingProvider.hide();
      } else {
        this.family = this.dataFamily.data;
        console.log("keluarga yang di pantau", this.dataFamily.data);
        if (this.family != "undefined") {
          for (var i = 0; i < this.family.length; i++) {
            temp[i] = this.family[i].rgn_subdistrict;
          }
          this.rgn_subdistrict = temp;
        }
        this.loadingProvider.hide();
      }
    });
  }
}
