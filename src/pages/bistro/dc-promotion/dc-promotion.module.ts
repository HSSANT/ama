import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcPromotionPage } from './dc-promotion';
import { ComponentsModule } from '../../../components/bistro/components.module';
@NgModule({
  declarations: [
    DcPromotionPage,
  ],
  imports: [
    IonicPageModule.forChild(DcPromotionPage),
    ComponentsModule
  ],
})
export class DcPromotionPageModule { }
