import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { AuthHttp , JwtHelper, AuthConfig} from 'angular2-jwt';
import { Storage ,IonicStorageModule } from '@ionic/storage';

import { ReportPage } from '../pages/report/report';
import { ProfilePage } from '../pages/profile/profile';
import { ArticlePage } from '../pages/article/article';
import { ArticleDetailPage } from '../pages/article-detail/article-detail';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FormulirPage } from '../pages/formulir/formulir';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';
// import { DatProvider } from '../providers/dat/dat';
import { DataProvider } from '../providers/data/data';
import { LoadingProvider } from '../providers/loading';
import { FileTransfer } from '@ionic-native/file-transfer';

import { SignupPage } from '../pages/signup/signup';
//set the auth http for API
export function getAuthHttp(http, Storage) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "",
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => {return Storage.get('token')}),
  }), http);
}


@NgModule({
  declarations: [
    // SignupPage,
    // FormulirPage,
    MyApp,
    // ArticleDetailPage,
    // ProfilePage,
    // ArticlePage,
    // LoginPage,
    // ReportPage,
    // HomePage,
    // TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // SignupPage,
    // FormulirPage,
    MyApp,
    // ArticleDetailPage,
    // ProfilePage,
    // ArticlePage,
    // ReportPage,
    // LoginPage,
    // HomePage,
    // TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMapsProvider,
    ConnectivityProvider,
    GoogleMapsClusterProvider,
    DataProvider,
    LoadingProvider,
    JwtHelper,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    },
  ]
})
export class AppModule {}
