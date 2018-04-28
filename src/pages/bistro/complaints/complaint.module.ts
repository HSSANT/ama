import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {  ComplaintPage } from './complaint';
import { ComponentsModule } from '../../../components/bistro/components.module';

@NgModule({
  declarations: [
    ComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintPage),
    ComponentsModule
  ],
})
export class ComplaintPageModule {}
