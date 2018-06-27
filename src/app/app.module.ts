import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';

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


@NgModule({
  declarations: [
    FormulirPage,
    MyApp,
    ArticleDetailPage,
    ProfilePage,
    ArticlePage,
    LoginPage,
    ReportPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FormulirPage,
    MyApp,
    ArticleDetailPage,
    ProfilePage,
    ArticlePage,
    ReportPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMapsProvider,
    ConnectivityProvider,
    GoogleMapsClusterProvider,
    DataProvider,
    LoadingProvider
  ]
})
export class AppModule {}
