import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcShipPaymentPage } from './dc-ship-payment';
import { ComponentsModule } from '../../../components/bistro/components.module';
@NgModule({
  declarations: [
    DcShipPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(DcShipPaymentPage),
    ComponentsModule
  ],
})
export class DcShipPaymentPageModule { }
