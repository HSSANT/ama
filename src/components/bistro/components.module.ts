import { NgModule } from '@angular/core';
import { DcHeaderComponent } from './dc-header/dc-header';
import { IonicPageModule } from 'ionic-angular';
import { NumberPickerComponent } from './number-picker/number-picker';
@NgModule({
	declarations: [DcHeaderComponent,
    NumberPickerComponent],
	imports: [IonicPageModule],
	exports: [DcHeaderComponent,
    NumberPickerComponent]
})
export class ComponentsModule { }
