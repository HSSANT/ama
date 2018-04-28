import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../../components/bistro/components.module';
import { GuidePage } from './guide';

@NgModule({
  declarations: [
    GuidePage,
  ],
  imports: [
    IonicPageModule.forChild(GuidePage),
    ComponentsModule
  ],
})
export class GuidePageModule {}
