import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {
  detailArtikel:any;
  penulis:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.detailArtikel = this.navParams.get("detail");
    let x:any;
    x = this.detailArtikel.admin;
    this.penulis = x.nama;
    console.log('ionViewDidLoad ArticleDetailPage', this.detailArtikel);
  }
  pop() {
    this.navCtrl.pop();
  }

}
