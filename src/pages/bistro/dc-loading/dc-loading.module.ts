import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcLoadingPage } from './dc-loading';

@NgModule({
  declarations: [
    DcLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(DcLoadingPage),
  ],
})
export class DcLoadingPageModule {}
