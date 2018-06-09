import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormulirPage } from './formulir';

@NgModule({
  declarations: [
    FormulirPage,
  ],
  imports: [
    IonicPageModule.forChild(FormulirPage),
  ],
})
export class FormulirPageModule {}
