import { Component, Input, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { HomePage } from "../home/home";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-formulir",
  templateUrl: "formulir.html"
})
export class FormulirPage {
  // src https://www.joshmorony.com/build-a-simple-progress-bar-component-in-ionic-2/
  @Input("progress") progress = 0;
  @ViewChild(Slides) slides: Slides;
  token = localStorage.getItem("tokenPatriot");
  q1: any;
  q2: any;
  q3: any;
  q4: any;
  q5: any;
  q6: any;
  q7: any;
  q8: any;
  q9: any;
  q10: any;
  foto: any;
  deskripsi: any;

  constructor(
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad FormulirPage");
  }
  nextSlide() {
    this.slides.slideNext();
  }
  previousSlide() {
    this.slides.slidePrev();
  }
  tidak1() {}
  tidak2() {
    this.previousSlide();
  }
  tidak3() {
    this.previousSlide();
  }
  tidak4() {
    this.previousSlide();
  }
  tidak5() {
    this.previousSlide();
  }
  tidak6() {
    this.previousSlide();
  }
  tidak7() {
    this.previousSlide();
  }
  ya1() {
    this.nextSlide();
    this.q1 = 1;
    this.progress = Math.round((1 / 7) * 100);
  }
  ya2() {
    this.nextSlide();
    this.q2 = 1;
    this.progress = Math.round((2 / 7) * 100);
  }
  ya3() {
    this.nextSlide();
    this.q3 = 1;
    this.progress = Math.round((3 / 7) * 100);
  }
  ya4() {
    this.nextSlide();
    this.q4 = 1;
    this.progress = Math.round((4 / 7) * 100);
  }
  ya5() {
    this.nextSlide();
    this.q5 = 1;
    this.progress = Math.round((5 / 7) * 100);
  }
  ya6() {
    this.nextSlide();
    this.q6 = 1;
    this.progress = Math.round((3 / 7) * 100);
  }
  ya7() {
    this.nextSlide();
    this.q7 = 1;
    this.progress = Math.round((3 / 7) * 100);
  }
  submit() {
    this.nextSlide();
    this.q1 = 1;
    this.progress = Math.round((3 / 7) * 100);
    this.progress = Math.round((4 / 7) * 100);
  }
  done() {
    // unhide tabs
    this.navCtrl.setRoot(HomePage);
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(0)";
        tabs[key].style.display = "inline";
      });
    } // end if
  }
  uploadFoto() {
    console.log("upload foto");
  }
  postReportApi() {
    let idsementara = 2;
    this.data
      .addReport(
        idsementara,
        this.token,
        this.q1,
        this.q2,
        this.q3,
        this.q4,
        this.q5,
        this.q6,
        this.q7,
        this.q8,
        this.q9,
        this.q10,
        this.foto,
        this.deskripsi
      )
      .then(success => {
        this.navCtrl.setRoot(TabsPage);
        console.log("success upload repord", success);
      })
      .catch(err => {
        console.log("error upload report", err);
      });
  }
}
