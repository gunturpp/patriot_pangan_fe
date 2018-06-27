import { Component, Input, ViewChild } from "@angular/core";
import {
  IonicPage,
  ActionSheetController,
  NavController,
  NavParams,
  Slides
} from "ionic-angular";
import { HomePage } from "../home/home";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { TabsPage } from "../tabs/tabs";
import { Camera } from "@ionic-native/camera";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-formulir",
  templateUrl: "formulir.html"
})
export class FormulirPage {
  // src https://www.joshmorony.com/build-a-simple-progress-bar-component-in-ionic-2/
  @Input("progress") progress = 0;
  @ViewChild(Slides) slides: Slides;
  idFamily: any;
  base64Image: string;
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
  soal1: any;
  soal2: any;
  soal3: any;

  constructor(
    public loadingProvider: LoadingProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.foto = "null";
    this.idFamily = this.navParams.get("idFamily");
    console.log("ionViewDidLoad FormulirPage. id :", this.idFamily);
  }
  nextSlide() {
    this.slides.slideNext();
  }
  previousSlide() {
    this.slides.slidePrev();
  }
  tidak1() {
    this.q1 = this.q2 = this.q3 = this.q4 = this.q5 = this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak2() {
    this.q2 = this.q3 = this.q4 = this.q5 = this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak3() {
    this.q3 = this.q4 = this.q5 = this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak4() {
    this.q4 = this.q5 = this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak5() {
    this.q5 = this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak6() {
    this.q6 = this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
  }
  tidak7() {
    this.q7 = 0;
    this.progress = 100;
    console.log("return q : ", this.q1);
    this.slides.slideTo(7, 200);
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
    this.progress = Math.round((6 / 7) * 100);
  }
  ya7() {
    this.nextSlide();
    this.q7 = 1;
    this.progress = Math.round((7 / 7) * 100);
  }
  submit() {
    this.nextSlide();
    this.q8 = this.soal1;
    console.log(this.soal1 + this.soal2 + this.soal3);
    if (this.soal2 == "melonjak") {
      this.q9 = 1;
    } else if (this.soal2 == "normal") {
      this.q9 = 0;
    }
    if (this.soal3 == "ada") {
      this.q10 = 1;
    } else if (this.soal3 == "tidak") {
      this.q10 = 0;
    }

    console.log("return : ", this.q8 + this.q9 + this.q10);
  }
  done() {
    this.postReportApi();
    // unhide tabs
    // this.navCtrl.setRoot(HomePage);
    // let tabs = document.querySelectorAll(".tabbar");
    // if (tabs !== null) {
    //   Object.keys(tabs).map(key => {
    //     tabs[key].style.transform = "translateY(0)";
    //     tabs[key].style.display = "inline";
    //   });
    // } // end if
  }
  postReportApi() {
    this.loadingProvider.show();
    this.data
      .addReport(
        this.idFamily,
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
        this.loadingProvider.hide();

        this.navCtrl.setRoot(TabsPage);
        console.log("success upload repord", success);
      })
      .catch(err => {
        this.loadingProvider.hide();
        console.log("error upload report", err);
      });
  }
  uploadPicture() {
    console.log("clicked");
    let actionSheet = this.actionSheetCtrl.create({
      title: "Pilihan",
      buttons: [
        {
          text: "Ambil Gambar",
          role: "ambilGambar",
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: "Pilih Dari Galleri",
          role: "gallery",
          handler: () => {
            this.getPhotoFromGallery();
          }
        }
      ]
    });
    actionSheet.present();
  }
  takePicture() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetWidth: 600,
        targetHeight: 600
      })
      .then(
        imageData => {
          this.base64Image = "data:image/png;base64," + imageData;
          this.foto = this.base64Image;
        },
        err => {
          alert(err);
        }
      );
  }
  getPhotoFromGallery() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
      })
      .then(
        imageData => {
          this.base64Image = "data:image/png;base64," + imageData;
          this.foto = this.base64Image;
        },
        err => {}
      );
  }
}
