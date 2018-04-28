import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Store } from '../../../providers/bistro/classes/store';
import { Complaint } from '../../../providers/bistro/classes/complaint';

@IonicPage()
@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtroller: AppControllerProvider,
    private modalCtrl: ModalController) {
     
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
   
    
  }

}
