import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { BookedSeat } from '../../../providers/bistro/classes/service';
@IonicPage()
@Component({
  selector: 'page-take-seat-modal',
  templateUrl: 'take-seat-modal.html',
})
export class TakeSeatModalPage {
  form: FormGroup;
  isSubmited = false;
  currentDateString = "";
  maxDateString = "";
  date: string = "";
  time: string = "";
  person: number;
  name: string = "";
  phone: string = "";
  note: string = "";

  dateRegex = /^(((0?[1-9]|[12]\d|3[01])[- /.](0?[13578]|1[02])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)[- /.](0?[13456789]|1[012])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])[- /.]0?2[- /.]((1[6-9]|[2-9]\d)\d{2}))|(29[- /.]02[- /.]((1[6-9]|[2-9]\d)(0?[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  errorMessage = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public viewCtrl: ViewController,
    public appCtrl: AppControllerProvider) {
    this.form = this.formBuilder.group({
      date: ["", Validators.compose([])],
      time: ["", Validators.compose([])],
      person: ["", Validators.compose([])],
      name: ["", Validators.compose([])],
      phone: ["", Validators.compose([])],
      note: ["", Validators.compose([])],
    });
    let date = new Date();
    this.currentDateString = this.getDateString(date);
    date.setMonth(date.getMonth() + 1);
    this.maxDateString = this.getDateString(date);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeSeatModalPage');
  }

  dateChange(event) {
    let day = event.day;
    let month = event.month;
    this.date = (day > 9 ? day : "0" + day) + "/" + (month > 9 ? month : "0" + month) + "/" + event.year;
  }

  changeTime(event) {
    let hour = event.hour;
    let minute = event.minute;
    this.time = (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute);
  }

  getDateString(date: Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return date.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day)
  }

  getBack() {
    this.viewCtrl.dismiss();
  }

  continue() {
    if (!this.isSubmited) {
      this.isSubmited = true;
      this.form.controls.date.setValidators(Validators.compose([Validators.required, Validators.pattern(this.dateRegex)]));
      this.form.controls.time.setValidators(Validators.compose([Validators.required, Validators.pattern(this.timeRegex)]));
      this.form.controls.person.setValidators(Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]));
      this.form.controls.name.setValidators(Validators.compose([Validators.required]));
      this.form.controls.phone.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^\d+$/)]));
      for (let key in this.form.controls) {
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      let date = new Date();
      let dateInput = ["", "", ""];
      let index = 0;
      this.date.split('').forEach(c => {
        if (isNaN(+c)) {
          index++;
        } else {
          dateInput[index] += c;
        }
      });
      date.setFullYear(+dateInput[2]);
      date.setMonth(+dateInput[1] - 1);
      date.setDate(+dateInput[0]);
      let timeInput = this.time.split(":");
      date.setHours(+timeInput[0]);
      date.setMinutes(+timeInput[1]);
      console.log(timeInput);
      console.log(date.toLocaleDateString(),date.toLocaleTimeString());
      this.appCtrl.getServiceProvider().addBookedSeat(new BookedSeat(date, this.person, this.name, this.phone, this.note));

      this.getBack();
      this.appCtrl.showToast("Đặt chỗ thành công");

    } else {
      let required = false;
      for (var key in this.form.controls) {
        if (this.form.controls.hasOwnProperty(key)) {
          var error = this.form.controls[key].errors;
          if (error)
            required = required || error["required"];
        }
      }
      if (required) {
        this.errorMessage = "Vui lòng điền đầy đủ những trường còn thiếu";
      } else {
        let fields = [];
        if (this.form.controls.date.errors && this.form.controls.date.errors.hasOwnProperty("pattern")) fields.push("Ngày");
        if (this.form.controls.time.errors && this.form.controls.time.errors.hasOwnProperty("pattern")) fields.push("Thời gian");
        if (this.form.controls.person.errors && this.form.controls.person.errors.hasOwnProperty("pattern")) fields.push("Số người");
        if (this.form.controls.phone.errors && this.form.controls.phone.errors.hasOwnProperty("pattern")) fields.push("Número de telefone");
        this.errorMessage = fields.join(', ') + " không hợp lệ";
      }

    }

  }


}
