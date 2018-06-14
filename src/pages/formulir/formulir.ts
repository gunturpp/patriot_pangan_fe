import { Component, Input, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { HomePage } from "../home/home";

/**
 * Generated class for the FormulirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-formulir",
  templateUrl: "formulir.html"
})
export class FormulirPage {
  // src https://www.joshmorony.com/build-a-simple-progress-bar-component-in-ionic-2/
  @Input("progress") progress = 0;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

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
    this.progress = Math.round(1/4*100);
  }
  ya2() {
    this.nextSlide();
    this.progress = Math.round(2/4*100);
  }
  ya3() {
    this.nextSlide();
    this.progress = Math.round(3/4*100);
  }

  submit() {
    this.nextSlide();
    this.progress = Math.round(4/4*100);
    
  }
  ya5() {
    this.nextSlide();
  }
  ya6() {
    this.nextSlide();
  }
  ya7() {
    this.nextSlide();
  }
  done() {
    // unhide tabs
    this.navCtrl.setRoot(HomePage);
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
        tabs[ key ].style.display = 'inline';
      });
    } // end if
  }
  uploadFoto() {
    console.log("upload foto");
  }
}
