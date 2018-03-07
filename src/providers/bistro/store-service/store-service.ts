import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from "../classes/store";

@Injectable()
export class StoreServiceProvider {
  stores: Array<Store> = [];
  dataVersion: number = 0;
  dataChangeHandler: any;
  constructor(public http: Http) {

  }

  updateData(version: number, data) {
    if (version > this.dataVersion) {
      this.resetData();
      this.dataVersion = version;
      for (let store of data) {
        let temStore = new Store(store["id"], store["vie"], store["en"]);
        this.stores.push(temStore);
      }
    }
    this.broadcastChange(this.stores);
  }

  onDataChange(handler) {
    this.dataChangeHandler = handler;
  }

  broadcastChange(data) {
    if (this.dataChangeHandler) this.dataChangeHandler(data);
  } 

  resetData() {
    this.stores = [];
  }

  getAllStores(): Array<Store> {
    return this.stores;
  }

}
