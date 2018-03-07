import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcMenuPage } from './dc-menu';
import {ComponentsModule} from '../../../components/bistro/components.module'; 
@NgModule({
  declarations: [
    DcMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DcMenuPage),
    ComponentsModule
  ]
})
export class DcMenuPageModule {}
