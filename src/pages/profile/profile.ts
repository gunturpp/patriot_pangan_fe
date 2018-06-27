import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Http } from "@angular/http";
import { DataProvider } from "../../providers/data/data";
import { Camera } from "@ionic-native/camera";
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  token:any;
  user:any;
  family:any;
  detail:any;
  dataUser:any;
  dataFamily:any;
  dataDetail:any;
  statusAdd:boolean;
  kepalaKeluarga:string;
  desa:string;
  alamat:string;
  foto:any;
  base64Image: string;
  rgn_subdistrict = [];
  constructor(
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public data: DataProvider,
    public http: Http,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.statusAdd = false;
    this.token = localStorage.getItem("tokenPatriot");
    console.log('ionViewDidLoad ProfilePage');
    this.getCurrentUser();
    this.getFamilyByPatriot();
    this.getDetailFamily();

  }
  edit() {
    console.log('ionViewDidLoad ProfilePage');    
  }
  addNewFamily() {
    this.data.addFamily(this.token,this.kepalaKeluarga,this.desa,this.alamat,this.foto).then(response=> {
      console.log("new family uploaded", response);
      this.navCtrl.setRoot(TabsPage);
      this.statusAdd = false;
    }).catch(err => {
      console.log("upload family error", err);
      this.statusAdd = false;
    })
  }
  getCurrentUser() {
    this.data.currentUser(this.token).then(user => {
      this.dataUser = user;
      this.user = this.dataUser.data;
      console.log("user profile", this.user);
      localStorage.setItem("currentUserPatriot", JSON.stringify(this.user));
    });
  }
  getFamilyByPatriot() {
    this.data.familyByPatriot(this.token).then(family => {
      let temp = [];
      this.dataFamily = family
      this.family = this.dataFamily.data;
      for(var i=0; i<this.family.length; i++) {
        temp[i] = this.family[i].rgn_subdistrict;
      }
      this.rgn_subdistrict = temp;
      console.log("poor family", this.dataFamily);
    });
  }
  getDetailFamily() {
    let idsementara = 14;
    this.data.detailFamily(idsementara,this.token).then(detailFamily => {
      this.dataDetail = detailFamily;
      this.detail = this.dataDetail.data;
      console.log("detail family", this.dataDetail);
    });
  }
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
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetWidth: 600,
        targetHeight: 600
      })
      .then(
        imageData => {
          this.base64Image = "data:image/png;base64," + imageData;
          this.foto = this.base64Image;
        },
        err => {
          alert(err);
        }
      );
  }
  getPhotoFromGallery() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600,
      })
      .then(
        imageData => {
          this.base64Image = "data:image/png;base64," + imageData;
          this.foto = this.base64Image;
        },
        err => {}
      );
  }

}
