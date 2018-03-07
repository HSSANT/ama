import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearStorePage } from './near-store';
import { ComponentsModule } from '../../../components/bistro/components.module';

@NgModule({
  declarations: [
    NearStorePage,
  ],
  imports: [
    IonicPageModule.forChild(NearStorePage),
    ComponentsModule
  ],
})
export class NearStorePageModule {}
