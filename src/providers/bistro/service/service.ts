import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BookedSeat } from '../classes/service';
@Injectable()
export class ServiceProvider {
  bookedSeat: Array<BookedSeat> = [];
  constructor(public http: Http) {

  }

  resetBookedSeat() {
    this.bookedSeat = [];
  }

  getBookedSeat() {
    return this.bookedSeat;
  }

  setBookedSeat(bookedSeat: Array<BookedSeat>) {
    this.bookedSeat = bookedSeat;
  }

  addBookedSeat(seat: BookedSeat) {
    this.bookedSeat.push(seat);
  }

}
