import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http,Headers,RequestOptions } from "@angular/http";

@Injectable()
export class DataProvider {
  constructor(public http: Http) {
    console.log("Hello DataProvider Provider");
  }
  // Post
  apiPostSignupUser = "http://patriotpangan.com/nodejs/auth/signuppatriot";
  apiPostLogin = "http://patriotpangan.com/nodejs/auth/loginpatriot";
  apiPostTambahKeluargaMiskin =
  "http://patriotpangan.com/nodejs/patriot/tambahkeluargamiskin";
  apiPostBuatLaporan = "http://patriotpangan.com/nodejs/patriot/buatlaporan/";
  // Get
  apiGetArtikel = "http://patriotpangan.com/nodejs/artikel/getartikel";
  apiGetAllKeluargaMiskin =
    "http://patriotpangan.com/nodejs/keluargamiskin/getkeluargamiskin";
  apiGetDetailKeluargaMiskin =
    "http://patriotpangan.com/nodejs/keluargamiskin/getdetailkeluargamiskin/";
  apiGetProfile = "http://patriotpangan.com/nodejs/patriot/profileku";
  apiGetKeluargaMiskinByUser =
    "http://patriotpangan.com/nodejs/patriot/getkeluargamiskinyangdipantau";

  // All post api
  // register user or patriot
  signUpUser(email, password, nama, gender, fk_desaid, alamat, foto) {
    return new Promise(resolve => {
      this.http
        .post(this.apiPostSignupUser, {
          email: email,
          password: password,
          nama: nama,
          gender: gender,
          fk_desaid: fk_desaid,
          alamat: alamat,
          foto: foto
        })
        .subscribe(data => {
          console.log("response", data);
          resolve(data);
        });
    }).then(success => {
      console.log("success", success);
      // resolve(success);
    });
  }
  // login user or patriot
  signIn(email, password) {
    return new Promise(resolve => {
      this.http
        .post(this.apiPostLogin, {
          email: email,
          password: password
        })
        .subscribe(data => {
          console.log("sukses", data);
          resolve(data.json());
        });
    });
  }
  addFamily(token,namaKeluarga,desaid,alamat,foto) {
        // headers token rest api
        let headers = new Headers({
          'token': token,
         });
         let options = new RequestOptions({ headers: headers });
          return new Promise(resolve => {
          this.http.post(this.apiPostTambahKeluargaMiskin,{
            namaKeluarga:namaKeluarga,
            desaid:desaid,
            alamat:alamat,
            foto:foto
          }, options).subscribe(data =>{
            resolve(data.json());
          });
        });
    
  }
  addReport(id,token,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,foto,deskripsi) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
        this.http.post(this.apiPostBuatLaporan+id,{
          q1:q1,
          q2:q2,
          q3:q3,
          q4:q4,
          q5:q5,
          q6:q6,
          q7:q7,
          q8:q8,
          q9:q9,
          q10:q10,
          foto:foto,
          deskripsi:deskripsi
        }, options).subscribe(data =>{
          resolve(data.json());
        });
  });

  }
  // All get api
  // patriot that current login in device
  currentUser(token) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
      this.http.get(this.apiGetProfile, options).subscribe(data =>{
        resolve(data.json());
      });
    });
  }
  // all article from admin
  article(token) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
      this.http.get(this.apiGetArtikel, options).subscribe(data =>{
        resolve(data.json());
      });
    });
  }
  // all family, not really needed
  allFamily(token) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
      this.http.get(this.apiGetAllKeluargaMiskin, options).subscribe(data =>{
        resolve(data.json());
      });
    });
  }
  // detail family profile
  detailFamily(id,token) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
      this.http.get(this.apiGetDetailKeluargaMiskin+id, options).subscribe(data =>{
        resolve(data.json());
      });
    });
  }
  // list family has by patriot
  familyByPatriot(token) {
    // headers token rest api
    let headers = new Headers({
      'token': token,
     });
     let options = new RequestOptions({ headers: headers });
      return new Promise(resolve => {
      this.http.get(this.apiGetKeluargaMiskinByUser, options).subscribe(data =>{
        resolve(data.json());
      });
    });
  }
}
