import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Discount } from '../classes/discount';
import { Store } from '../classes/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DiscountServiceProvider {
  discounts: Array<Discount> = [];
  allDiscounts: Array<Discount> = [];
  constructor(public http: Http) {
    console.log('Hello DiscountServiceProvider Provider');
    let content = `Aproveite essa oportunidade unica utilizando esse cupom lhe garante 30% desconto em todas as compras nos Comércios Cadastrados`;
    for (let i = 0; i < 10; i++) {
      this.discounts.push(new Discount("Cupom de Desconto iBookLet", 'http://midiacult.com.br/wp-content/uploads/2017/02/Cupom-de-desconto.jpg', new Date("2017-10-02"), new Date("2017-10-08"), content,"Extra Super Mercados"));
    }
  }



  
  getAllDiscount() {
    return this.discounts;
  }

  addDiscount(discount: Discount) {
    this.discounts.push(discount);
  }
  

}
