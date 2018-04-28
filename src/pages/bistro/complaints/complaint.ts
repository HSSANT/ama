import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Store } from '../../../providers/bistro/classes/store';
import { Complaint } from '../../../providers/bistro/classes/complaint';

@IonicPage()
@Component({
  selector: 'page-complaint',
  templateUrl: 'complaint.html',
})
export class ComplaintPage {
  complaints: Array<Complaint>=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtroller: AppControllerProvider,
    private modalCtrl: ModalController) {
      this.complaints=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearStorePage');
    this.appCtroller.getStoreService().getAllCompliants().then((res: any) => {
      if (res) {
        console.log(res);
        this.complaints = res;
      
      }
    })
  }

  ionViewDidEnter() {
   
    console.log("complaint", this.complaints);
  }

  addStore() {
    let modal = this.modalCtrl.create("StoreAdminPage");
    modal.present();
    modal.onDidDismiss(() => {
    })
  }

  loadStores() {
    this.complaints = this.appCtroller.getStoreService().getComplaint();
  }
  backToFindPlace(){
    this.navCtrl.push("DcTaxiPage");
  }

}
