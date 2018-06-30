import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  AlertController
} from "ionic-angular";
import { Http, Headers } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { Camera } from "@ionic-native/camera";
import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "../login/login";
import { LoadingProvider } from "../../providers/loading";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  token: any;
  user: any;
  family: any;
  detail: any;
  dataUser: any;
  dataFamily: any;
  dataDetail: any;
  statusAdd: boolean;
  kepalaKeluarga: string;
  desa: any;
  alamat: string;
  foto: any;
  base64Image: string;
  rgn_subdistrict = [];
  sumReports: any;

  listProvince: any;
  listKabupaten: any = [];
  listKecamatan: any = [];
  listKelurahan: any = [];
  showPassword: boolean;
  temp: any;
  province: any;
  kabupaten: any;
  kecamatan: any;
  kelurahan: any;
  idKelurahan: any;
  constructor(
    public alertCtrl: AlertController,
    public loading: LoadingProvider,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private camera: Camera,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.token = localStorage.getItem("tokenPatriot");
    this.getFamilyByPatriot();
    this.getCurrentUser();
    this.getlistProvince();
    console.log("user profile", this.user);

    this.statusAdd = false;
    console.log("ionViewDidLoad ProfilePage");
    this.data
      .decodeToken(this.token)
      .then(decoded => {
        let sumReport: any;
        sumReport = decoded;
        this.sumReports = sumReport.token;
        console.log("decode token : ", this.sumReports.laporanterkirim);
      })
      .catch(err => {});

    // this.getDetailFamily();
  }
  getCurrentUser() {
    this.loading.show();
    this.data
      .currentUser(this.token)
      .then(user => {
        this.dataUser = user;
        console.log(this.dataUser);
        if (this.dataUser.status == 200 || this.dataUser.status == true ) {
          this.user = this.dataUser.json().data;
          this.loading.hide();
        } else {
          localStorage.clear();
          this.navCtrl.parent.parent.setRoot("LoginPage");
          this.tokenExpiredToast();
        }
      })
      .catch(err => {
        alert("Terjadi kesalahan, silahkan coba kembali");
        console.log("terjadi error", err);
        this.loading.hide();
        this.failToast();
        this.navCtrl.setRoot(TabsPage);
      });
  }
  alertProvince() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih Provinsi");
    let temp = this.listProvince;
    for (let i = 0; i < temp.length; i++) {
      alert.addInput({
        type: "radio",
        label: temp[i].name,
        value: temp[i],
        checked: false
      });
    }
    alert.addButton("Tutup");
    alert.addButton({
      text: "OK",
      handler: Prov => {
        this.getlistKabupaten(Prov.id);
        this.province = Prov.name;
        console.log("namanya ", this.province);
      }
    });
    alert.present();
  }
  alertKabupaten() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih Kabupaten");
    let temp: any = this.listKabupaten;
    for (let i = 0; i < temp.length; i++) {
      alert.addInput({
        type: "radio",
        label: this.listKabupaten[i].name,
        value: this.listKabupaten[i],
        checked: false
      });
    }

    alert.addButton("Tutup");
    alert.addButton({
      text: "OK",
      handler: kabupaten => {
        this.getlistKecamatan(kabupaten.id);
        this.kabupaten = kabupaten.name;
        console.log("nama kecamatan yang dipilih ", this.kabupaten);
      }
    });
    alert.present();
  }
  alertKecamatan() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih Kecamatan");
    let temp: any = this.listKecamatan;
    for (let i = 0; i < temp.length; i++) {
      alert.addInput({
        type: "radio",
        label: this.listKecamatan[i].name,
        value: this.listKecamatan[i],
        checked: false
      });
      console.log(this.listKecamatan[i].name);
    }
    alert.addButton("Tutup");
    alert.addButton({
      text: "OK",
      handler: kecamatan => {
        this.getlistKelurahan(kecamatan.id);
        this.kecamatan = kecamatan.name;
        console.log("nama kecamatan yang dipilih ", this.kecamatan);
      }
    });
    alert.present();
  }
  alertKelurahan() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih Kelurahan");
    let temp: any = this.listKelurahan;
    for (let i = 0; i < temp.length; i++) {
      alert.addInput({
        type: "radio",
        label: this.listKelurahan[i].name,
        value: this.listKelurahan[i],
        checked: false
      });
    }
    alert.addButton("Tutup");
    alert.addButton({
      text: "OK",
      handler: kelurahan => {
        this.idKelurahan = kelurahan.id;
        this.kelurahan = kelurahan.name;
        console.log("kelurahan yang diplih", this.kelurahan);
      }
    });
    alert.present();
  }
  getlistProvince() {
    this.loading.show();
    this.data
      .getProvince()
      .then(provinsi => {
        this.temp = provinsi;
        if ((this.temp.status = 200)) {
          this.listProvince = this.temp.json().data;
          console.log("provinsi", this.listProvince);
          this.loading.hide();
        } else {
          console.log("gagal get provinsi");
          this.loading.hide();
        }
      })
      .catch(err => {
        this.loading.hide();
        alert("Koneksi anda bermasalah");
      });
  }
  getlistKabupaten(idProvince) {
    this.loading.show();
    this.data
      .getKabupaten(idProvince)
      .then(kabupaten => {
        this.temp = kabupaten;
        if ((this.temp.status = 200)) {
          this.listKabupaten = this.temp.json().data;
          console.log("kabupaten", this.listKabupaten);
          this.loading.hide();
        } else {
          console.log("gagal get kabupaten");
          this.loading.hide();
        }
      })
      .catch(err => {
        this.loading.hide();
        alert("Koneksi anda bermasalah");
      });
  }
  getlistKecamatan(idKabupaten) {
    this.loading.show();

    this.data
      .getKecamatan(idKabupaten)
      .then(kecamatan => {
        this.temp = kecamatan;
        if ((this.temp.status = 200)) {
          this.listKecamatan = this.temp.json().data;
          console.log("Kecamatan", this.listKecamatan);
          this.loading.hide();
        } else {
          console.log("gagal kecamatan");
          this.loading.hide();
        }
      })
      .catch(err => {
        this.loading.hide();
        alert("Terjadi kesalahan, silahkan coba kembali");
      });
  }
  getlistKelurahan(idKecamatan) {
    this.loading.show();

    this.data
      .getKelurahan(idKecamatan)
      .then(kelurahan => {
        this.temp = kelurahan;
        if ((this.temp.status = 200)) {
          this.listKelurahan = this.temp.json().data;
          console.log("kelurahan", this.listKelurahan);
          this.loading.hide();
        } else {
          console.log("gagal get kelurahan");
          this.loading.hide();
        }
      })
      .catch(err => {
        this.loading.hide();
        alert("Koneksi anda bermasalah");
      });
  }
  edit() {
    console.log("ionViewDidLoad ProfilePage");
  }
  addNewFamily() {
    this.loading.show();
    this.data
      .addFamily(this.token, this.kepalaKeluarga, this.alamat, this.foto)
      .then(response => {
        console.log("new family uploaded", response);
        this.addFamilyToast();
        this.navCtrl.setRoot("TabsPage");
        this.statusAdd = false;
        this.loading.hide();
      })
      .catch(err => {
        this.failFamilyToast();
        console.log("upload family error", err);
        this.statusAdd = false;
        this.loading.hide();
      });
  }
  getFamilyByPatriot() {
    this.loading.show();
    let temp = [];
    this.data
      .familyByPatriot(this.token)
      .then(family => {
        this.dataFamily = family;
        console.log("data family", this.dataFamily);
        if ((this.dataFamily.status = 200)) {
          this.family = this.dataFamily.json().data;
          console.log("family", this.family);
          for (var i = 0; i < this.family.length; i++) {
            temp[i] = this.family[i].rgn_subdistrict;
          }
          this.rgn_subdistrict = temp;
          this.loading.hide();
        } else {
          console.log("gagal get api family by patriot");
          this.loading.hide();
        }
      })
      .catch(err => {
        alert("terjadi kesalahan, silahkan coba kembali");
        console.log("error get family by patriot", err);
      });
  }
  // getDetailFamily() {
  //   let idsementara = 14;
  //   this.data.detailFamily(idsementara, this.token).then(detailFamily => {
  //     this.dataDetail = detailFamily;
  //     this.detail = this.dataDetail.data;
  //     console.log("detail family", this.dataDetail);
  //   });
  // }
  statusAddFamily() {
    this.statusAdd = true;
  }
  close() {
    this.statusAdd = false;
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
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetWidth: 600,
        targetHeight: 600
      })
      .then(
        imageData => {
          // this.base64Image = "data:image/png;base64," + imageData;
          this.foto = imageData;
        },
        err => {
          alert(err);
        }
      );
  }
  getPhotoFromGallery() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
      })
      .then(
        imageData => {
          // this.base64Image = "data:image/png;base64," + imageData;
          this.foto = imageData;
        },
        err => {}
      );
  }
  logout() {
    this.loading.show();
    localStorage.removeItem("tokenPatriot");
    this.navCtrl.parent.parent.setRoot("LoginPage");
    this.loading.hide();
  }
  addFamilyToast() {
    const toast = this.toastCtrl.create({
      message: "Berhasil menambahkan keluarga baru",
      duration: 3000
    });
    toast.present();
  }
  failFamilyToast() {
    const toast = this.toastCtrl.create({
      message: "Gagal menambahkan keluarga baru",
      duration: 3000
    });
    toast.present();
  }
  logoutToast() {
    const toast = this.toastCtrl.create({
      message: "Berhasil keluar",
      duration: 3000
    });
    toast.present();
  }
  failToast() {
    const toast = this.toastCtrl.create({
      message: "Gagal meminta data",
      duration: 3000
    });
    toast.present();
  }
  tokenExpiredToast() {
    const toast = this.toastCtrl.create({
      message: "Token kadaluarsa, silahkan login kembali",
      duration: 3000
    });
    toast.present();
  }
}
