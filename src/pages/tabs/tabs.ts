import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { ArticlePage } from '../article/article';
import { ReportPage } from '../report/report';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReportPage;
  tab3Root = ArticlePage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
