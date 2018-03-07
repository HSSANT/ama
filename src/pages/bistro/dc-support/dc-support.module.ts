import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcSupportPage } from './dc-support';
import { ComponentsModule } from '../../../components/bistro/components.module';

@NgModule({
  declarations: [
    DcSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(DcSupportPage),
    ComponentsModule
  ],
})
export class DcSupportPageModule { }
