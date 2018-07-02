import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: any;
  password: any;
  statusRegister: any = false;
  showPassword: boolean;
  user:any;
  public token: any;
  constructor(
    public loading: LoadingProvider,
    public toastCtrl: ToastController,
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}
  ionViewDidLoad() {
    
    if (
      !localStorage.getItem("tokenPatriot") ||
      localStorage.getItem("tokenPatriot") == "undefined"
    ) {
      
    } else {
      this.navCtrl.setRoot("TabsPage");
    }

  }
  // Login user from DataProvider
  signIn() {
    this.data.signIn(this.email, this.password).then(user => {
      this.user = user;
      this.navCtrl.setRoot("TabsPage");
      console.log(this.user);
    }).catch(err => {
      alert("terjadi kesalahan, silahkan coba kembali");
      console.log("errpor signin method", err);

    });
  }
  unRegistToast() {
    const toast = this.toastCtrl.create({
      message: "Email belum terdaftar",
      duration: 3000
    });
    toast.present();
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: "Email/password salah. Pastikan email dan password benar.",
      duration: 3000
    });
    toast.present();
  }
  // Register user from DataProvider
  signUp() {
    // this.navCtrl.push(KirimOperasiPasarPage);
    this.navCtrl.push("SignupPage");
  }
}
