import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

@IonicPage()
@Component({
  selector: 'page-dc-support',
  templateUrl: 'dc-support.html',
})
export class DcSupportPage {
  form: FormGroup;
  table: number;
  note: string = "";
  errorMessage = "";
  isSubmited = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private appCtrl: AppControllerProvider, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        table: [""],
        note: [""]
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcSupportPage');
  }

  continue() {
    if (!this.isSubmited) {
      this.form.controls.table.setValidators(Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]));
      this.form.controls.table.updateValueAndValidity();
      this.form.updateValueAndValidity();
    }
    if (this.form.valid) {
      console.log("valid");
      this.appCtrl.showToast("Informacoes Enviadas");
    } else {
      let error = this.form.controls.table.errors
      if (error && error["required"]) {
        this.errorMessage = "verifique os campos obrigatórios";
      } else {
        if (error && error.hasOwnProperty("pattern")) {
          this.errorMessage = "Telefone Inválido";
        }
      }
    }

  }

}
