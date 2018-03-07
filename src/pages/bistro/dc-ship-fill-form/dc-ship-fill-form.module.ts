import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcShipFillFormPage } from './dc-ship-fill-form';
import { ComponentsModule } from '../../../components/bistro/components.module';
import { FormsModule }   from '@angular/forms';
@NgModule({
  declarations: [
    DcShipFillFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DcShipFillFormPage),
    ComponentsModule,
    FormsModule
  ],
})
export class DcShipFillFormPageModule { }
