import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { Food, OrderedFood } from '../../../providers/bistro/classes/food';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { Category } from '../../../providers/bistro/classes/category';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/delay';
@IonicPage()
@Component({
  selector: 'page-dc-ship',
  templateUrl: 'dc-ship.html',
})
export class DcShipPage {
  steps = [
    {
      number: 1,
      title: "Escolha o Prato",
      active: true,
      hasArrow: true,
      isDone: false
    },
    {
      number: 2,
      title: "Preencha os Dados",
      active: false,
      hasArrow: true,
      isDone: false
    },
    {
      number: 3,
      title: "Escolha a Forma de Pagamento",
      active: false,
      hasArrow: true,
      isDone: false
    },
    {
      number: 4,
      title: "Confirmação",
      active: false,
      hasArrow: false,
      isDone: false
    }
  ]

  tab = "popular";
  popularFoods: Array<OrderedFood> = [];
  menuFoods: Array<OrderedFood> = [];
  orderedFoods: Array<OrderedFood> = [];
  categories: Array<Category> = [];

  observer: Subscription = new Subscription();
  debounceTime = 100;

  keyword: string = "";
  foodsPerScreen: number = 10;
  popularFoodMaxItems = false;
  popularFoodOnLoadMore = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {

  }

  ionViewDidLoad() {
    this.loadMorePopularFoods();
  }
  mViewEnterTime: number = 0;
  ionViewDidEnter() {
    if (this.mViewEnterTime != 0) return;
    let fixedTop = <HTMLElement>document.getElementById('ship-fixed-top');
    let content = <HTMLElement>document.querySelector('#ship-ion-content .scroll-content');
    let searchBar = <HTMLElement>document.getElementById('dc-ship-search-bar');
    let searchBarHeight = <HTMLElement>document.getElementById('dc-searchbar-height');
    if (fixedTop && content && searchBar && searchBarHeight) {
      content.style.paddingTop = fixedTop.offsetHeight - searchBar.offsetHeight + "px";
      searchBarHeight.style.height = searchBar.offsetHeight + "px";
    }

    this.loadCategories();
    this.mViewEnterTime++;

  }

  loadCategories() {
    this.categories = this.appController.getCategoryService().getAllCategories();
  }

  getFoodByCategory(category) {
    let foodObserver = this.appController.getFoodService().getFoodByCategory(category, this.keyword);
    foodObserver.subscribe(data => {
      category["numberOfItems"] = data.length;
    });
    return foodObserver;
  }

  loadMorePopularFoods(infiniteScroll?) {
    if (this.popularFoodMaxItems) return;
    this.appController.getFoodService().getPopularFoods(this.keyword, this.popularFoods.length, this.foodsPerScreen).subscribe(data => {
      let index = 0;
      if (data) {
        if (data.length == 0) {
          this.popularFoodMaxItems = true;
          return;
        }
        this.observer = Observable.interval(this.debounceTime).subscribe(() => {
          if (index == data.length) {
            this.observer.unsubscribe();
            if (infiniteScroll) infiniteScroll.complete();
            this.popularFoodOnLoadMore = false;
            return;
          }
          let food = data[index] as OrderedFood;
          if (!food["quantily"])
            food["quantily"] = 0;
          this.popularFoods.push(food);
          index++;
        })
      }
    })
  }

  selectFood(food: OrderedFood, quantily: number) {
    food["quantily"] = quantily;
    if (quantily > 0) this.orderedFoods.push(food);
    if (quantily == 0) {
      let i = this.orderedFoods.findIndex(elm => {
        return elm.id == food.id;
      })
      if (i > -1) {
        this.orderedFoods.splice(i, 1);
      }
    }
  }

  changeFoodQuantily(food: OrderedFood, quantily: number) {
    food.quantily = quantily;
  }

  getTotalPrice() {
    let sum = 0;
    this.orderedFoods.forEach(food => {
      sum += food.quantily * food.price;
    })
    return sum.toLocaleString();
  }

  cancelOrder() {
    this.orderedFoods.forEach(food => {
      food.quantily = 0;
    })
    this.orderedFoods = [];
  }

  continueOrder() {
    if (this.orderedFoods.length > 0) {
      this.appController.getFoodService().setShipFood(this.orderedFoods);
      this.navCtrl.push("DcShipFillFormPage");
    }
  }

  search() {
    this.createDefault();
    this.loadMorePopularFoods();
  }

  createDefault() {
    this.popularFoodMaxItems = false;
    this.popularFoodOnLoadMore = false;
    this.popularFoods = [];
    this.observer.unsubscribe();
  }
}
