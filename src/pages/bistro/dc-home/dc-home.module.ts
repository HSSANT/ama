import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DcHomePage } from './dc-home';
import { ComponentsModule } from '../../../components/bistro/components.module';
// import { DirectivesModule } from '../../directives/directives.module'  

@NgModule({
  declarations: [
    DcHomePage,

  ],
  imports: [
    IonicPageModule.forChild(DcHomePage),
    ComponentsModule 
  ] 
})
export class DcHomePageModule { }
