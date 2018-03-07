import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Food, OrderedFood } from '../../../providers/bistro/classes/food';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
@IonicPage()
@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html',
})
export class FoodDetailPage {
  food: OrderedFood = new OrderedFood(0, 0,0, "Phở bò sốt vang", "Beef beef beef");
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private appController: AppControllerProvider) {
    if (this.navParams.get("food")) {
      let food = this.navParams.get("food");
      this.food = food as OrderedFood;
      console.log(food);
    }
    this.food["unit"] = "bát";
    console.log(this.food.quantily);
    if (!this.food.quantily)
      this.food["quantily"] = 1;
    if (!this.food.parallelFoods)
      this.food["parallelFoods"] = [new OrderedFood(0, 0,0, "Quẩy nóng (1 đĩa)", "Up all night", 10000), new OrderedFood(0, 0, 0, "Trứng chần", "Nude eggs", 5000)]
  }


  addQuantily() {
    this.food.quantily++;
  }

  minusQuantily() {
    if (this.food.quantily > 0)
      this.food.quantily--;
  }

  addOrder() {
    if (this.food.quantily <= 0) {
      this.showToast("A quantidade precisa ser maior que 0", 3000);
    } else {
      let food = new OrderedFood(0, 0,0, "", "");
      food.cloneFrom(this.food);
      this.appController.getFoodService().addOrderedFood(food);
      this.food.quantily = 0;
      this.showToast( "O item " + this.food.titleEng + " foi adicionado ao carrinho!", 3000);
    }
  }

  showToast(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: "bottom",
      cssClass: "toast-ios"
    })
    toast.present();
  }

  selectParallelFood(parallelFood) {
    parallelFood.quantily = 1 - parallelFood.quantily;
  }

}
