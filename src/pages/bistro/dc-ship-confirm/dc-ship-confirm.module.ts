import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcShipConfirmPage } from './dc-ship-confirm';
import { ComponentsModule } from '../../../components/bistro/components.module';
@NgModule({
  declarations: [
    DcShipConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(DcShipConfirmPage),
    ComponentsModule
  ],
})
export class DcShipConfirmPageModule { }
