import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcServicePage } from './dc-service';
import { ComponentsModule } from '../../../components/bistro/components.module'

@NgModule({
  declarations: [
    DcServicePage,
  ],
  imports: [
    IonicPageModule.forChild(DcServicePage),
    ComponentsModule
  ],
})
export class DcServicePageModule { }
