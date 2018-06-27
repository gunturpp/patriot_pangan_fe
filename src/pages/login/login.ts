import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email:any;
  password:any;
  nama:any;
  gender:any;
  fk_desaid:any;
  alamat:any;
  foto:any;
  constructor(  
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
  protected user: any;
  protected token: any;
  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    if(localStorage.getItem('tokenPatriot')) {
     this.navCtrl.setRoot(TabsPage);
    }
    console.log("new token",localStorage.getItem('status'));
  }
  // Login user from DataProvider
  signIn() {
    this.data
      .signIn(this.email, this.password)
      .then(user => {
        this.user = user;
        console.log("user", this.user);

        // save token to localstorage
        localStorage.setItem("tokenPatriot", this.user.token);
      })
      .then(success => {
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(err => {
        console.log("error", err);
      });
  }
  // Register user from DataProvider
  signUp() {
    console.log("clicked");

    this.data
      .signUpUser(
        this.email,
        this.password,
        this.nama,
        this.gender,
        this.fk_desaid,
        this.alamat,
        this.foto
      )
      .then(response => {
        console.log("response", response);
      });
  }
}
