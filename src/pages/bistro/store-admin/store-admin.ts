import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { BookedSeat } from '../../../providers/bistro/classes/service';
import { Address } from '../../../providers/bistro/classes/address';
import { Store } from '../../../providers/bistro/classes/store';

@IonicPage()
@Component({
  selector: 'page-store-admin',
  templateUrl: 'store-admin.html',
})
export class StoreAdminPage {
 
//campos do address
  formAddress:FormGroup;
  adress: string = "";
  txtAddress:string;
  isSubmitedAddress = false;
  currentAddress: Address;

  //campos do Store
  form: FormGroup;
  isSubmited = false;
  currentDateString = "";
  maxDateString = "";
  date: string = "";
  startTime: string = "";
  endTime: string = "";
  person: number;
  name: string = "";
  phone: string = "";
  note: string = "";
  address:string ="";
  url:string ="";

  currentStore: Store = new Store();

  dateRegex = /^(((0?[1-9]|[12]\d|3[01])[- /.](0?[13578]|1[02])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)[- /.](0?[13456789]|1[012])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])[- /.]0?2[- /.]((1[6-9]|[2-9]\d)\d{2}))|(29[- /.]02[- /.]((1[6-9]|[2-9]\d)(0?[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  errorMessage = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public viewCtrl: ViewController,
    public appCtrl: AppControllerProvider) {
    this.form = this.formBuilder.group({
      startTime: ["", Validators.compose([])],
      endTime: ["", Validators.compose([])],
      name: ["", Validators.compose([])],
      phone: ["", Validators.compose([])],
      address: ["", Validators.compose([])],
      url: ["", Validators.compose([])],
    });
    let date = new Date();
    this.currentDateString = this.getDateString(date);
    date.setMonth(date.getMonth() + 1);
    this.maxDateString = this.getDateString(date);
    
    //form busca maps
    this.formAddress = this.formBuilder.group(
      {
        address: [""]
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad store admin');
  }
  ionViewDidEnter(){
    this.currentAddress = this.appCtrl.getAddressService().getCurrentAddress();
    this.txtAddress = this.getTarget(this.currentAddress);
  }

  dateChange(event) {
    let day = event.day;
    let month = event.month;
    this.date = (day > 9 ? day : "0" + day) + "/" + (month > 9 ? month : "0" + month) + "/" + event.year;
  }

  changeTime(event,opt?:any) {
    let hour = event.hour;
    let minute = event.minute;
    if(opt)
    this.startTime = (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute);
    else
    this.endTime = (hour > 9 ? hour : "0" + hour) + ":" + (minute > 9 ? minute : "0" + minute);
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
     

      
      this.form.controls.startTime.setValidators(Validators.compose([Validators.required, Validators.pattern(this.timeRegex)]));
      this.form.controls.address.setValidators(Validators.compose([Validators.required]));
      this.form.controls.endTime.setValidators(Validators.compose([Validators.required, Validators.pattern(this.timeRegex)]));
      this.form.controls.name.setValidators(Validators.compose([Validators.required]));
      this.form.controls.url.setValidators(Validators.compose([Validators.required]));
      this.form.controls.phone.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^\d+$/)]));
      for (let key in this.form.controls) {
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (this.form.valid) {
      let dateStart = new Date();
      let dateEnd = new Date();
      let dateInput = ["", "", ""];
      let index = 0;
      this.date.split('').forEach(c => {
        if (isNaN(+c)) {
          index++;
        } else {
          dateInput[index] += c;
        }
      });
      // date.setFullYear(+dateInput[2]);
      // date.setMonth(+dateInput[1] - 1);
      // date.setDate(+dateInput[0]);
      let startTimeInput = this.startTime.split(":");
      dateStart.setHours(+startTimeInput[0]);
      dateStart.setMinutes(+startTimeInput[1]);
      let endTimeInput = this.startTime.split(":");
      dateEnd.setHours(+endTimeInput[0]);
      dateEnd.setMinutes(+endTimeInput[1]);
      console.log(startTimeInput);
      console.log(endTimeInput);
      console.log(dateStart.toLocaleDateString(),dateStart.toLocaleTimeString());


      this.currentStore.setAddress(this.appCtrl.getAddressService().getCurrentAddress());
      this.name = this.name;
      this.currentStore.startTime = dateStart.toLocaleTimeString();
      this.currentStore.endTime = dateEnd.toLocaleTimeString();
      this.currentStore.phoneNumber = 1111111;
      this.currentStore.id = 1;
      


      if(!this.appCtrl.getStoreService().addStore(this.currentStore))
        console.log("ocorreu um erro ao inserir");
      this.getBack();
      this.appCtrl.showToast("Solicitação Conclúida");

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
        this.errorMessage = "Preencha os Campos Obrigatórios";
      } else {
        let fields = [];
        if (this.form.controls.startTime.errors && this.form.controls.startTime.errors.hasOwnProperty("pattern")) fields.push("Hora de abertura");
        if (this.form.controls.endTime.errors && this.form.controls.endTime.errors.hasOwnProperty("pattern")) fields.push("Hora de Fechamento");
        if (this.form.controls.name.errors && this.form.controls.name.errors.hasOwnProperty("pattern")) fields.push("Nome");
        if (this.form.controls.phone.errors && this.form.controls.phone.errors.hasOwnProperty("pattern")) fields.push("Número de telefone");
        this.errorMessage = fields.join(', ') + " Erro em ";
      }

    }

  }

 //metodos de busca maps

 continueAddress() {
  if (this.currentAddress) {
   
    this.appCtrl.getAddressService().addRecentAddress(this.currentAddress);

  } else {
    this.errorMessage = "Selecione seu Local";
  }

}

getTarget(address: Address) {
  if (address) {
    if (address.address.toLowerCase().includes(address.name.toLowerCase())) {
      return address.address;
    }else{
      return address.name + " " + address.address;
    }
  }
  return "Destino";
}

pickPlace(event) {
  this.navCtrl.push("DcFindPlacePage");
}


uploadFoto(event) {
  this.appCtrl.getStoreService().selectPhoto();
  this.url="Upload Efetuado";
}

}
