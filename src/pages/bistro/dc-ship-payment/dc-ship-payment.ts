import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-dc-ship-payment',
  templateUrl: 'dc-ship-payment.html',
})
export class DcShipPaymentPage {
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
      active: false,
      hasArrow: true,
      isDone: true
    },
    {
      number: 3,
      title: "Escolha a Forma de Pagamento",
      active: true,
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
  method = 'cash';
  card: string = "";
  name: string = "";
  expiredDate: string = "";
  ccv: string = "";
  errorMessage = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      card: ["", Validators.compose([])],
      name: ["", Validators.compose([])],
      expired: ["", Validators.compose([])],
      ccv: ["", Validators.compose([])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcShipPaymentPage');
  }

  ionViewDidEnter() {
    let fixedTop = <HTMLElement>document.getElementById('ship-payment-fixed-top');
    let content = <HTMLElement>document.querySelector('#ship-payment-ion-content .scroll-content');
    if (fixedTop && content) {
      content.style.paddingTop = fixedTop.offsetHeight + "px";
    }
    this.setEnableForm(false);
  }

  continue() {
    if (this.method == 'master') {
      for (var key in this.form.controls) {
        if (this.form.controls.hasOwnProperty(key)) {
          var control = this.form.controls[key];
          control.setValidators(Validators.compose([Validators.required]));
          control.updateValueAndValidity();
        }
      }
      if (this.form.valid) {
        this.gotoConfirm();
      } else {
        this.errorMessage = "Vui lòng điền vào những trường còn thiếu";
      }
    }
    else {
      this.errorMessage = "";
      this.gotoConfirm();
    }
  }

  gotoConfirm() {
    this.navCtrl.push('DcShipConfirmPage');
  }

  paymentMethodChange(event) {
    console.log(event);
    if (event == 'master') this.setEnableForm(true);
    else {
      this.setEnableForm(false);
      this.errorMessage = "";
    }
  }

  setEnableForm(enable: boolean) {
    if (enable) console.log("enable form");
    else console.log("disable form");
    for (var key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        var element = this.form.controls[key];
        if (enable) element.enable();
        else element.disable();
        element.updateValueAndValidity();
      }
    }
  }

  getBack() {
    this.navCtrl.pop();
  }


}
