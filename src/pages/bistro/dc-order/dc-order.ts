import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Food, OrderedFood } from '../../../providers/bistro/classes/food'
@IonicPage()
@Component({
  selector: 'page-dc-order',
  templateUrl: 'dc-order.html',
})
export class DcOrderPage {
  orderList: Array<OrderedFood> = [];
  totalPrice: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appController: AppControllerProvider) {
  }
  
  ionViewDidLoad() {
    this.orderList = this.appController.getFoodService().getOrderedFoods();
    this.caculateTotalPrice();
  }

  changeFoodQuantily(food: OrderedFood, quantily) {
    food.quantily = quantily;
    this.caculateTotalPrice();
  }

  selectParallelFood(parallelFood) {
    parallelFood.quantily = 1 - parallelFood.quantily;
    this.caculateTotalPrice();
  }

  caculateTotalPrice() {
    this.totalPrice = 0;

    this.orderList.forEach(food => {
      let des = "";
      this.totalPrice += food.price * food.quantily;
      for (let i = 0; i < food.parallelFoods.length; i++) {
        let element = food.parallelFoods[i];
        if (element.quantily > 0) {
          if (i > 0 && des.trim() != "") des += ", ";
          des += element.titleVie;
          this.totalPrice += element.price * element.quantily;
        }
      }

      if (food.note) {
        if (des.trim() != "") des += ", ";
        des += food.note;
      }
      if (des.trim() == "") des = "Ghi chú";
      food["des"] = des;
    });
  }

  order() {
    this.appController.showToast("Đặt món thành công");
  }

  gotoMenuPage() {
    this.appController.setRootPage("DcMenuPage");
  }

  
}
