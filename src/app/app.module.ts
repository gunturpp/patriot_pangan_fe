import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReportPage } from '../pages/report/report';
import { ProfilePage } from '../pages/profile/profile';
import { ArticlePage } from '../pages/article/article';
import { ArticleDetailPage } from '../pages/article-detail/article-detail';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FormulirPage } from '../pages/formulir/formulir';


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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
