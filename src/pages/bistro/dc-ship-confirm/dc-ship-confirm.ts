import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller'
@IonicPage()
@Component({
  selector: 'page-dc-ship-confirm',
  templateUrl: 'dc-ship-confirm.html',
})
export class DcShipConfirmPage {
  steps = [
    {
      number: 1,
      title: "Escolha",
      active: false,
      hasArrow: true,
      isDone: true
    },
    {
      number: 2,
      title: "Preencha os Dados",
      active: false,
      hasArrow: true,
      isDone: true
    },
    {
      number: 3,
      title: "Escolha a Forma de Pagamento",
      active: false,
      hasArrow: true,
      isDone: true
    },
    {
      number: 4,
      title: "Confirmação",
      active: true,
      hasArrow: false,
      isDone: false
    }
  ]
  checkedIcon = '<i class="fa fa-check" aria-hidden="true"></i>';
  discount = 0;
  shipCost = 15000;
  shipDistance = 5;
  shipFoods = [];
  totalPrice = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appCtrl: AppControllerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcShipConfirmPage');
  }

  ionViewDidEnter() {
    let fixedTop = <HTMLElement>document.getElementById('ship-confirm-fixed-top');
    let content = <HTMLElement>document.querySelector('#ship-confirm-ion-content .scroll-content');
    if (fixedTop && content) {
      content.style.paddingTop = fixedTop.offsetHeight + "px";
    }

    this.shipFoods = this.appCtrl.getFoodService().getShipFood();
  }

  getTotalPrice() {
    let total = 0;
    this.shipFoods.forEach(food => {
      total += food.quantily * food.price;
    });
    this.totalPrice = total + this.shipCost - this.discount;
    return total.toLocaleString();
  }

  getBack() {
    this.navCtrl.pop();
  }

  continue() {
    this.appCtrl.showToast("Pedido Efetuado Com Sucesso");
  }

}
