import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ArticleDetailPage } from "../article-detail/article-detail";
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: "page-article",
  templateUrl: "article.html"
})
export class ArticlePage {
  token:any;
  articles: any;
  penulis = [];
  constructor(
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.token = localStorage.getItem("tokenPatriot");
    this.getArticle();

    console.log("ionViewDidLoad ArticlePage");
  }
  readmore(detail) {
    this.navCtrl.push(ArticleDetailPage, {detail:detail});
  }
  getArticle() {
    this.data.article(this.token).then(article => {
      let temp:any;
      let admin= [];
      temp = article;
      this.articles = temp.data;
      for(var i=0; i<this.articles.length;i++) {
        admin[i] = this.articles[i].admin;
        this.penulis[i] = admin[i].nama;
      }
      console.log("artikel", this.articles);
      console.log("admin", admin);
      console.log("penulis", this.penulis);
    }).catch(err => {
      console.log("error",err);
    })
  }
}
