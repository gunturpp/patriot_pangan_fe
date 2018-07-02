import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-article",
  templateUrl: "article.html"
})
export class ArticlePage {
  // global variable
  token: any;
  articles: any;
  penulis = [];
  constructor(
    public toastCtrl: ToastController,
    public loadingProvider: LoadingProvider,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    // get token from local storage
    this.token = localStorage.getItem("tokenPatriot");
  }

  ionViewDidEnter() {
    // get new data article each page click
    this.getArticle();
    console.log("ionViewDidLoad ArticlePage");
  }
  // go to detail page
  readmore(detail) {
    this.navCtrl.push("ArticleDetailPage", { detail: detail });
  }
  // get article from rest api
  getArticle() {
    this.loadingProvider.show();
    this.data
      .article(this.token)
      .then(article => {
        let temp: any;
        let admin = [];
        temp = article;
        if (temp.status == 200) {
          this.articles = temp.json().data;
          console.log("artikel", this.articles);
          for (var i = 0; i < this.articles.length; i++) {
            admin[i] = this.articles[i].admin;
            this.penulis[i] = admin[i].nama;
          }
          console.log("admin", admin);
          console.log("penulis", this.penulis);
          this.loadingProvider.hide();
        } else {
          alert("Terjadi kesalahan. Silahkan coba lagi");
          this.loadingProvider.hide();
        }
      })
      .catch(err => {
        console.log("error", err);
        this.loadingProvider.hide();
        this.failToast();
      });
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: "Gagal meminta artikel",
      duration: 3000
    });
    toast.present();
  }
}
