import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Store } from '../../../providers/bistro/classes/store';

@IonicPage()
@Component({
  selector: 'page-near-store',
  templateUrl: 'near-store.html',
})
export class NearStorePage {
  stores: Array<Store>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtroller: AppControllerProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearStorePage');
  }

  ionViewDidEnter() {
    this.loadStores();
    console.log("nearstore", this.stores);
  }

  addStore() {
    let modal = this.modalCtrl.create("StoreAdminPage");
    modal.present();
    modal.onDidDismiss(() => {
    })
  }

  loadStores() {
    this.stores = this.appCtroller.getStoreService().getAllStores();
  }
  backToFindPlace(){
    this.navCtrl.push("DcTaxiPage");
  }

}
