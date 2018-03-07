import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { BookedSeat } from '../../../providers/bistro/classes/service';

@IonicPage()
@Component({
  selector: 'page-dc-take-seat',
  templateUrl: 'dc-take-seat.html',
})
export class DcTakeSeatPage {
  bookedSeat: Array<BookedSeat> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appCtroller: AppControllerProvider,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcTakeSeatPage');
  }

  ionViewDidEnter() {
    this.loadBookedSeat();
    console.log("bookedseat", this.bookedSeat);
  }

  bookSeat() {
    let modal = this.modalCtrl.create("TakeSeatModalPage");
    modal.present();
    modal.onDidDismiss(() => {
      this.loadBookedSeat();
    })
  }

  loadBookedSeat() {
    this.bookedSeat = this.appCtroller.getServiceProvider().getBookedSeat();
  }
}
