import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ToastController,
  AlertController
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { LoadingProvider } from "../../providers/loading";
import { Camera } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  email: any;
  password: any;
  nama: any;
  gender: any;
  fk_desaid: any;
  alamat: any;
  foto: any;
  listProvince: any = [];
  listKabupaten: any = [];
  listKecamatan: any = [];
  listKelurahan: any = [];
  showPassword: boolean;
  temp: any;
  province: any = [];
  kabupaten: any = [];
  kecamatan: any = [];
  kelurahan: any = [];
  idKelurahan: any;
  gendernya: string;
  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public loading: LoadingProvider,
    public data: DataProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.getlistProvince()
  }
  goSignUp() {
    this.loading.show();
    console.log("clicked");
    this.data
      .signUpUser(
        this.email,
        this.password,
        this.nama,
        this.gender,
        this.idKelurahan,
        this.alamat,
        this.foto
      )
      .then(response => {
        this.loading.hide();
        this.successToast();
        this.navCtrl.pop();
        console.log("response", response);
      })
      .catch(err => {
        alert("Koneksi anda bermasalah");
      });
  }
  successToast() {
    const toast = this.toastCtrl.create({
      message: "Anda berhasil mendaftar sebagai patriot.",
      duration: 3000
    });
    toast.present();
  }
  alertGender() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih jenis kelamin");
    alert.addInput({
      type: "radio",
      label: "Laki-laki",
      value: "1",
      checked: false
    });
    alert.addInput({
      type: "radio",
      label: "Perempuan",
      value: "0",
      checked: false
    });
    alert.addButton("Tutup");
    alert.addButton({
      text: "OK",
      handler: gender => {
        if (gender == 1) {
          this.gendernya = "Laki-laki";
        } else {
          this.gendernya = "Perempuan";
        }
        this.gender = gender;
      }
    });
    alert.present();
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
  alertKabupaten() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Pilih Kabupaten");
    for (let i = 0; i < this.listKabupaten.length; i++) {
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
    for (let i = 0; i < this.listKecamatan.length; i++) {
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
    for (let i = 0; i < this.listKelurahan.length; i++) {
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
  getlistKabupaten(idProvince) {
    this.loading.show();
    this.data
      .getKabupaten(idProvince)
      .then(kabupaten => {
        this.temp = kabupaten;
        if ((this.temp.status = 200)) {
          this.listKabupaten = this.temp.json().data;
          console.log("kabupate", this.listKabupaten);
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
}
