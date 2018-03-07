import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-discount-detail',
  templateUrl: 'discount-detail.html',
})
export class DiscountDetailPage {
  discount;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get("discount")) this.discount = this.navParams.get("discount"); 
    console.log(this.navParams.get("discount"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountDetailPage');

  }

}
