import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {
  detailArtikel:any;
  penulis:any;
  constructor(public loadingProvider: LoadingProvider,public navCtrl: NavController, public navParams: NavParams) {
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
