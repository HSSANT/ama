import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/bistro/components.module';
import { StoreAdminPage } from './store-admin';

@NgModule({
  declarations: [
    StoreAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreAdminPage),
    ComponentsModule
  ],
})
export class StoreAdminPageModule {}
