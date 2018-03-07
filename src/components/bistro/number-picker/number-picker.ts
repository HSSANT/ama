import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalController } from 'ionic-angular';
@Component({
  selector: 'number-picker',
  templateUrl: 'number-picker.html'
})
export class NumberPickerComponent {

  @Input()
  number: number;
  @Input()
  min: number = 1;
  @Input()
  max: number = 999;
  @Output()
  onDataChange = new EventEmitter<number>();
  constructor(private modalCtrl: ModalController) {
    if (this.number) this.number = 0;
  }
  minus() {
    if (this.number > this.min) {
      this.number--;
      this.onDataChange.emit(this.number);
    }
  }
  add() {
    if (this.number < this.max) {
      this.number++;
      this.onDataChange.emit(this.number);
    }
  }
  showNumberPicker() {
    let modal = this.modalCtrl.create("QBTicketingModalNumber", {
      value: this.number
    })
    modal.present();
    modal.onDidDismiss((data) => {
      if (data.value != -1) {
        this.number = +data.value;
        this.onDataChange.emit(this.number);
      }
    });
  }
}
