import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcLoginPage } from './dc-login';
import {ComponentsModule} from '../../../components/bistro/components.module';
import { FormsModule }   from '@angular/forms';
@NgModule({
  declarations: [
    DcLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(DcLoginPage),
    FormsModule,
    ComponentsModule
  ],
})
export class DcLoginPageModule {}
