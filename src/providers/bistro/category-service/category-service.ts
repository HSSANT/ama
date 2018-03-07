import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from "../classes/category";

@Injectable()
export class CategoryServiceProvider {
  categories: Array<Category> = [];
  dataVersion: number = 0;
  dataChangeHandler: any;
  constructor(public http: Http) {

  }

  updateData(version: number, data) {
    if (version > this.dataVersion) {
      this.resetData();
      this.dataVersion = version;
      for (let category of data) {
        let temCategory = new Category(category["id"], category["vie"], category["en"]);
        this.categories.push(temCategory);
      }
    }
    this.broadcastChange(this.categories);
  }

  onDataChange(handler) {
    this.dataChangeHandler = handler;
  }

  broadcastChange(data) {
    if (this.dataChangeHandler) this.dataChangeHandler(data);
  } 

  resetData() {
    this.categories = [];
  }

  getAllCategories(): Array<Category> {
    return this.categories;
  }

}
