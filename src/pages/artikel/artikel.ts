import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Artikel2Page } from '../artikel2/artikel2';

/**
 * Generated class for the ArtikelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artikel',
  templateUrl: 'artikel.html',
})
export class ArtikelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openArtikel2Page() {
    this.navCtrl.push(Artikel2Page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelPage');
  }

}
