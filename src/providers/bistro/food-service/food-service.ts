import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../../http-service';
import { Observable } from 'rxjs';
import { Food, OrderedFood } from '../classes/food';
import { Category } from '../classes/category';
import { Store } from '../classes/store';
@Injectable()
export class FoodServiceProvider {
  allFoods: Array<Food> = [];
  orderedFood: Array<OrderedFood> = [];
  shipFood: Array<OrderedFood> = [];

  dataVersion: number = 0;
  constructor(private http: HttpService) {
  }

  updateData(version: number, data) {
    if (version > this.dataVersion) {
      this.resetData();
      this.dataVersion = version;

      if (data) {
        for (let food of data) {
          let temFood = new Food(food["id"], food["category"], food["category"],food["vie"],
            food["en"], food["price"], food["img"], food["currency"], "", food["option"], food["size"], 0);
          this.allFoods.push(temFood);
        }
      }
    }
    this.onDataChange();
  }

  onDataChange(): Observable<Array<Food>> {
    return Observable.of(this.allFoods);
  }

  resetData() {
    this.allFoods = [];
  }

  addOrderedFood(food: OrderedFood) {
    let index = this.orderedFood.findIndex(elm => {
      return elm.id == food.id;
    });
    if (index > -1) {
      this.orderedFood[index].quantily += food.quantily;
      this.orderedFood[index].parallelFoods = food.parallelFoods;
      this.orderedFood[index].note = food.note;
    } else {
      let orederedFood = new OrderedFood(0,0,0, "", "");
      orederedFood.cloneFrom(food);
      this.orderedFood.push(orederedFood);
    }
  }

  resetOrderedFood() {
    this.orderedFood = [];
  }

  getFoodByCategory(category: Category, keyword?: string, startIndex?: number, count?: number): Observable<Array<Food>> {
    let filteredFoods = this.allFoods.filter(elm => {
      return elm.category == category.id;
    });
    if (keyword) {
      keyword = keyword.toLowerCase();
      filteredFoods = filteredFoods.filter(food => {
        return food.keyWord.includes(keyword) || category.keyword.includes(keyword);
      });
    }
    if (!isNaN(startIndex) && !isNaN(count)) {
      return Observable.of(filteredFoods.slice(startIndex, startIndex + count));
    } else {
      return Observable.of(filteredFoods);
    }
  }

  getFoodByStore(store: Store, keyword?: string, startIndex?: number, count?: number): Observable<Array<Food>> {
    let filteredFoods = this.allFoods.filter(elm => {
      return elm.store == store.id;
    });
    if (keyword) {
      keyword = keyword.toLowerCase();
      filteredFoods = filteredFoods.filter(food => {
        return food.keyWord.includes(keyword) || store.keyword.includes(keyword);
      });
    }
    if (!isNaN(startIndex) && !isNaN(count)) {
      return Observable.of(filteredFoods.slice(startIndex, startIndex + count));
    } else {
      return Observable.of(filteredFoods);
    }
  }

  getOrderFoodByCategory(category: number, keyword?: string, startIndex?: number, count?: number): Observable<Array<OrderedFood>> {
    let filteredFoods: Array<any> = this.allFoods.filter(elm => {
      return elm.category == category;
    });
    if (keyword) {
      keyword = keyword.toLowerCase();
      filteredFoods = filteredFoods.filter(food => {
        return food.keyWord.includes(keyword);
      });
    }
    filteredFoods.forEach(element => {
      element = element as OrderedFood;
      element["quantily"] = 0;
    });
    if (!isNaN(startIndex) && !isNaN(count)) {
      return Observable.of(filteredFoods.slice(startIndex, startIndex + count));
    } else {
      return Observable.of(filteredFoods);
    }
  }

  getOrderedFoods() {
    return this.orderedFood;
  }

  getPopularFoods(keyword?: string, startIndex?: number, count?: number): Observable<Array<Food>> {
    return this.getFoodByCategory(new Category(1,"",""), keyword, startIndex, count);
  }

  setShipFood(shipFoods: Array<OrderedFood>) {
    this.shipFood = shipFoods;
  }

  getShipFood() {
    return this.shipFood;
  }
}
