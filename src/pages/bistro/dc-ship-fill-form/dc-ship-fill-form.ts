import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-dc-ship-fill-form',
  templateUrl: 'dc-ship-fill-form.html',
})
export class DcShipFillFormPage {
  steps = [
    {
      number: 1,
      title: "Escolha o Prato",
      active: false,
      hasArrow: true,
      isDone: true
    },
    {
      number: 2,
      title: "Preencha os Dados",
      active: true,
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

  checkedIcon = '<i class="fa fa-check" aria-hidden="true"></i>';
  form: FormGroup;
  isSubmited = false;
  currentDateString = "";
  maxDateString = "";
  date: string = "";
  time: string = "";
  name: string = "";
  phone: string = "";
  address: string = "";
  note: string = "";

  dateRegex = /^(((0?[1-9]|[12]\d|3[01])[- /.](0?[13578]|1[02])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)[- /.](0?[13456789]|1[012])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])[- /.]0?2[- /.]((1[6-9]|[2-9]\d)\d{2}))|(29[- /.]02[- /.]((1[6-9]|[2-9]\d)(0?[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  errorMessage = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      date: ["", Validators.compose([])],
      time: ["", Validators.compose([])],
      name: ["", Validators.compose([])],
      phone: ["", Validators.compose([])],
      address: ["", Validators.compose([])],
      note: ["", Validators.compose([])],
    });
    let date = new Date();
    this.currentDateString = this.getDateString(date);
    date.setMonth(date.getMonth() + 1);
    this.maxDateString = this.getDateString(date); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcShipFillFormPage');
  }

  ionViewDidEnter() {
    let fixedTop = <HTMLElement>document.getElementById('ship-fill-form-fixed-top');
    let content = <HTMLElement>document.querySelector('#ship-fill-form-ion-content .scroll-content');
    if (fixedTop && content) {
      content.style.paddingTop = fixedTop.offsetHeight + "px";
      
    } 
  }

  continue() {
    if (!this.isSubmited) {
      this.isSubmited = true;
      this.form.controls.date.setValidators(Validators.compose([Validators.required, Validators.pattern(this.dateRegex)]));
      this.form.controls.time.setValidators(Validators.compose([Validators.required, Validators.pattern(this.timeRegex)]));
      this.form.controls.name.setValidators(Validators.compose([Validators.required]));
      this.form.controls.phone.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^\d+$/)]));
      this.form.controls.address.setValidators(Validators.compose([Validators.required]));
      for (let key in this.form.controls) {
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      this.navCtrl.push("DcShipPaymentPage");
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
        this.errorMessage = "Preencha os campos que faltam";
      } else {
        let fields = [];
        if (this.form.controls.date.errors && this.form.controls.date.errors.hasOwnProperty("pattern")) fields.push("Data de Entrega");
        if (this.form.controls.time.errors && this.form.controls.time.errors.hasOwnProperty("pattern")) fields.push("tempo de entrega");
        if (this.form.controls.phone.errors && this.form.controls.phone.errors.hasOwnProperty("pattern")) fields.push("Número de telefone");
        this.errorMessage = fields.join(', ') + " não é válido";
      }

    }

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
    this.navCtrl.pop();
  }

}
