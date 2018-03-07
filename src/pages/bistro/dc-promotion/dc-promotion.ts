import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Discount } from '../../../providers/bistro/classes/discount';
@IonicPage()
@Component({
  selector: 'page-dc-promotion',
  templateUrl: 'dc-promotion.html',
})
export class DcPromotionPage {
  promotions = [
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private appController: AppControllerProvider) {
    
  } 
  loadAllPromotion() {
    this.promotions = this.appController.getDiscountService().getAllDiscount();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcPromotionPage');
    this.loadAllPromotion(); 
  }

  gotoDiscountDetail(discount) {
    this.navCtrl.push("DiscountDetailPage", { "discount": discount });
  }

}
