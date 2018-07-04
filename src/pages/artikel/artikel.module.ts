import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtikelPage } from './artikel';

@NgModule({
  declarations: [
    ArtikelPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtikelPage),
  ],
})
export class ArtikelPageModule {}
