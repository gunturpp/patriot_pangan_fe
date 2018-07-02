import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AuthHttp, JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { LoadingProvider } from "../../providers/loading";
import { ToastController, NavController } from "ionic-angular";
import { TabsPage } from "../../pages/tabs/tabs";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DataProvider {
  public BASE_URL = "http://patriotpangan.com/nodejs/";
  public COLOR_RAWAN = [
    {
      id: 0,
      name: "Tidak Rawan",
      color: "a1a8af"
    },
    {
      id: 1,
      name: "Rawan Pangan 1",
      color: "00aa00"
    },
    {
      id: 2,
      name: "Rawan Pangan 2",
      color: "adff2f"
    },
    {
      id: 3,
      name: "Rawan Pangan 3",
      color: "ffff00"
    },
    {
      id: 4,
      name: "Rawan Pangan 4",
      color: "ff0000"
    },
    {
      id: 5,
      name: "Rawan Pangan 5",
      color: "b03060"
    }
  ];

  constructor(
    // public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingProvider: LoadingProvider,
    public http: Http,
    public authHttp: AuthHttp,
    public storage: Storage,
    private transfer: FileTransfer,
    public jwtHelper: JwtHelper
  ) {
    console.log("Hello DataProvider Provider");
  }
  user: any;
  // Post
  apiPostSignupUser = "http://patriotpangan.com/nodejs/auth/signuppatriot";
  apiPostLogin = "http://patriotpangan.com/nodejs/auth/loginpatriot";
  apiPostTambahKeluargaMiskin =
    "http://patriotpangan.com/nodejs/patriot/tambahkeluargamiskin";
  apiPostBuatLaporan = "http://patriotpangan.com/nodejs/patriot/buatlaporan/";
  // Get
  apiGetProvince = "http://patriotpangan.com/nodejs/lokasi/semuaprovinsi";
  apiGetKabupaten = "http://patriotpangan.com/nodejs/lokasi/semuakabupaten/"; // + id
  apiGetKecamatan = "http://patriotpangan.com/nodejs/lokasi/semuakecamatan/"; // + id;
  apiGetKelurahan = "http://patriotpangan.com/nodejs/lokasi/semuakelurahan/"; // + id;

  apiGetArtikel = "http://patriotpangan.com/nodejs/artikel/getartikel";
  apiGetAllKeluargaMiskin =
    "http://patriotpangan.com/nodejs/keluargamiskin/getkeluargamiskin";
  apiGetDetailKeluargaMiskin =
    "http://patriotpangan.com/nodejs/keluargamiskin/getdetailkeluargamiskin/";
  apiGetProfile = "http://patriotpangan.com/nodejs/patriot/profileku";
  apiGetKeluargaMiskinByUser =
    "http://patriotpangan.com/nodejs/patriot/getkeluargamiskinyangdipantau";

  decodeToken(token) {
    return new Promise(resolve => {
      let decoded = this.jwtHelper.decodeToken(token);
      resolve(decoded);
    });
  }
  // All post api
  // register user or patriot
  signUpUser(email, password, nama, gender, fk_desaid, alamat, foto) {
    return new Promise((resolve, reject) => {
      console.log("uri file ", foto);
      this.loadingProvider.show();
      const fileTransfer: FileTransferObject = this.transfer.create();
      let params = {
        email: email,
        password: password,
        nama: nama,
        gender: gender,
        fk_desaid: fk_desaid,
        alamat: alamat
      };

      var options: FileUploadOptions = {
        fileKey: "foto",
        fileName: "image.jpg",
        chunkedMode: false,
        mimeType: "image/jpeg",
        params: params
      };

      fileTransfer.upload(foto, this.apiPostSignupUser, options, true).then(
        res => {
          let data = res.response;
          // alert(JSON.stringify(data))
          console.log(res + " Uploaded Successfully");
          this.loadingProvider.hide();
          resolve(data);
        },
        err => {
          alert(JSON.stringify);
          this.loadingProvider.hide();
          alert(JSON.stringify(err));
          reject(err);
        }
      );
    });
  }

  // login user or patriot
  signIn(email, password) {
    return new Promise(resolve => {
      this.http
        .post(this.apiPostLogin, {
          email: email,
          password: password,
          type: 1
        })
        .subscribe(data => {
          console.log("data balikan login", data);
          if (data.status == 200 && data.json().status) {
            console.log("masuk njay");
            localStorage.setItem("tokenPatriot", data.json().token);
            console.log("sukses", data);
            const toast = this.toastCtrl.create({
              message: "Selamat datang patriot!",
              duration: 3000
            });
            toast.present();
            resolve(data.json());
          } else if (data.status == 200 && data.json().status == false) {
            const toast = this.toastCtrl.create({
              message: data.json().message,
              duration: 3000
            });
            toast.present();
          } else {
            const toast = this.toastCtrl.create({
              message: "email atau password salah",
              duration: 3000
            });
            toast.present();
          }
        }),
        err => {
          alert("err " + err);
        };
    });
  }
  addFamily(token, namaKeluarga, alamat, foto) {
    return new Promise((resolve, reject) => {
      console.log("uri file ", foto);
      this.loadingProvider.show();
      const fileTransfer: FileTransferObject = this.transfer.create();
      let params = {
        namakeluarga: namaKeluarga,
        alamat: alamat
      };

      // let toke='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE2MWM0ZWZkN2M5NjcxMGQ1MWFlMzciLCJ1c2VyX2lkIjoxMTMsInVzZXJuYW1lIjoicGV0YW5pMjAxOCIsInRpbWUiOiJGcmksIDMwIE1hciAyMDE4IDIwOjIzOjQ5IEdNVCIsInJvbGUiOjQsImxvZ2luX3R5cGUiOjEsImlhdCI6MTUyMjQ0MTQyOX0.mrD9q-R3KibbiVLoKWhYFbzqYE-l3yFQKHsW9MZ1Yp8'
      var options: FileUploadOptions = {
        fileKey: "foto",
        fileName: "image.jpg",
        chunkedMode: false,
        mimeType: "image/jpeg",
        params: params,
        headers: { token: token }
      };

      fileTransfer
        .upload(foto, this.apiPostTambahKeluargaMiskin, options, true)
        .then(
          res => {
            let data = res.response;
            // alert(JSON.stringify(data))
            console.log(res + " Uploaded Successfully");
            this.loadingProvider.hide();

            resolve(data);
          },
          err => {
            alert(JSON.stringify);
            this.loadingProvider.hide();
            alert(JSON.stringify(err));
            reject(err);
          }
        );
    });
  }
  addReport(
    id,
    token,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    q8,
    q9,
    q10,
    foto,
    deskripsi
  ) {
    return new Promise((resolve, reject) => {
      console.log("uri file ", foto);
      this.loadingProvider.show();
      const fileTransfer: FileTransferObject = this.transfer.create();
      let params = {
        id: id,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        q6: q6,
        q7: q7,
        q8: q8,
        q9: q9,
        q10: q10,
        deskripsi: deskripsi
      };

      var options: FileUploadOptions = {
        fileKey: "foto",
        fileName: "image.jpg",
        chunkedMode: false,
        mimeType: "image/jpeg",
        params: params,
        headers: { token: token }
      };

      fileTransfer
        .upload(foto, this.apiPostBuatLaporan + id, options, true)
        .then(
          res => {
            let data = res.response;
            // alert(JSON.stringify(data))
            console.log(res + " Uploaded Successfully");
            this.loadingProvider.hide();

            resolve(data);
          },
          err => {
            alert(JSON.stringify);
            this.loadingProvider.hide();
            alert(JSON.stringify(err));
            reject(err);
          }
        );
    });
  }
  getProvince() {
    return new Promise(resolve => {
      this.http.get(this.apiGetProvince).subscribe(data => {
        resolve(data);
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }
  getKabupaten(idProvince) {
    return new Promise(resolve => {
      this.http.get(this.apiGetKabupaten + idProvince).subscribe(data => {
        resolve(data);
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }
  getKecamatan(idKecamatan) {
    return new Promise(resolve => {
      this.http.get(this.apiGetKecamatan + idKecamatan).subscribe(data => {
        resolve(data);
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }
  getKelurahan(idKelurahan) {
    return new Promise(resolve => {
      this.http.get(this.apiGetKelurahan + idKelurahan).subscribe(data => {
        resolve(data);
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }
  // All get api
  // patriot that current login in device
  currentUser(token) {
    // headers token rest api
    let headers = new Headers({
      token: token
    });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.authHttp.get(this.apiGetProfile, options).subscribe(data => {
        resolve(data);
        console.log("profilekuuh", data);
        localStorage.setItem("currentPatriot", JSON.stringify(data));
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
          localStorage.clear();
        };
    });
  }
  // all article from admin
  article(token) {
    // headers token rest api
    let headers = new Headers({
      token: token
    });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.authHttp.get(this.apiGetArtikel, options).subscribe(data => {
        console.log("get artikel", data);
        resolve(data);
      }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }
  // all family, not really needed
  allFamily(token) {
    // headers token rest api
    let headers = new Headers({
      token: token
    });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.authHttp
        .get(this.apiGetAllKeluargaMiskin, options)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }
  // detail family profile
  detailFamily(id, token) {
    // headers token rest api
    let headers = new Headers({
      token: token
    });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.authHttp
        .get(this.apiGetDetailKeluargaMiskin + id, options)
        .subscribe(data => {
          resolve(data.json());
        });
    });
  }
  // list family has by patriot
  familyByPatriot(token) {
    // headers token rest api
    let headers = new Headers({
      token: token
    });
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.authHttp
        .get(this.apiGetKeluargaMiskinByUser, options)
        .subscribe(data => {
          console.log("fam by patriot",data);
          resolve(data);
        }),
        err => {
          alert("Terjadi kesalahan, silahkan coba kembali");
        };
    });
  }

  // rest
  public get(url: string, token: string): Observable<{}> {
    const header = new Headers();

    header.append("Content-type", "application/json");
    header.append("token", token);
    return this.http.get(url, { headers: header }).map((response: Response) => {
      // extract data
      if (response.status == 204) {
        console.log("masuk no content ");
        return [];
      } else {
        const body = response.json();
        return body || {};
      }
    });
  }

  public post(url: string, token: string, claims: any): Observable<{}> {
    const header = new Headers();
    console.log("TOKEN from post ", token);
    header.append("Content-type", "application/json");
    header.append("token", token);
    return this.http
      .post(url, claims, { headers: header })
      .map((response: Response) => {
        const body = response.json();
        return body || {};
      });
  }
}
