import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcTakeSeatPage } from './dc-take-seat';
import { ComponentsModule } from '../../../components/bistro/components.module';

@NgModule({
  declarations: [
    DcTakeSeatPage,
  ],
  imports: [
    IonicPageModule.forChild(DcTakeSeatPage),
    ComponentsModule
  ],
})
export class DcTakeSeatPageModule {}
