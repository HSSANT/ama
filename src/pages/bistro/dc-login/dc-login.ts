import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
@IonicPage()
@Component({
  selector: 'page-dc-login',
  templateUrl: 'dc-login.html',
})
export class DcLoginPage {
  phone = "962696997";
  password = "janadolphin";
  loginForm: FormGroup;
  isSubmitted = false;
  phoneErrorMessage = "";
  passwordErrorMessage = "";
  rootPage = "DcHomePage";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private appController: AppControllerProvider) {
    this.loginForm = this.formBuilder.group({
      phone: ["", Validators.compose([Validators.maxLength(20), Validators.minLength(8), Validators.required, Validators.pattern(/^\d+$/)])],
      password: ["", Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  ionViewDidEnter() { 
    // if (this.phone) {
    //   this.loginForm.controls["phone"].markAsDirty();
    //   this.loginForm.controls["phone"].markAsTouched();
    // };
    // if (this.password) {
    //   this.loginForm.controls["password"].markAsDirty();
    //   this.loginForm.controls["password"].markAsTouched();
    // };
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.appController.getUserService().login(this.phone, this.password);
      console.log(this.navCtrl.canGoBack());
      if (this.navCtrl.canGoBack()) this.navCtrl.popToRoot();
      else {
        this.appController.setRootPage(this.rootPage);
      }
    } else {
      this.checkForm();
    }
  }

  checkForm() {
    let phoneError = this.loginForm.controls.phone.errors;
    if (phoneError) {
      if (phoneError.hasOwnProperty('required')) {
        this.phoneErrorMessage = "Vui lòng điền Número de telefone";
      } else {
        this.phoneErrorMessage = "Número de telefone không hợp lệ";
      }
    }
    let passwordError = this.loginForm.controls.password.errors;
    if (passwordError) {
      if (passwordError.hasOwnProperty('required')) {
        this.passwordErrorMessage = "Vui lòng điền Senha";
      } else {
        this.passwordErrorMessage = "Senha phải có độ dài tối thiểu 6 kí tự";
      }
    }
  }

  gotoRegister() {
    this.navCtrl.push("DcRegisterPage");
  }
}
