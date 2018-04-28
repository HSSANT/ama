import { Component,ViewChild, ViewContainerRef, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';
import { BookedSeat } from '../../../providers/bistro/classes/service';
import { Address } from '../../../providers/bistro/classes/address';
import { Store } from '../../../providers/bistro/classes/store';
import { Complaint } from '../../../providers/bistro/classes/complaint';
import { DcServicePage } from '../dc-service/dc-service';

@IonicPage()
@Component({
  selector: 'page-store-admin',
  templateUrl: 'store-admin.html', 
})
export class StoreAdminPage {

 
//instanciar datepicker
@ViewChildren('datePicker') datePicker;


//campos do address
  formAddress:FormGroup;
  adress: string = "";
  txtAddress:string;
  isSubmitedAddress = false;
  countFotos = 0;
  currentAddress: Address;
  area:any;
  extInt:any;
  images: any[] = [{id:0,url:"assets/bistro/images/service/camera.png"},{id:1,url:"assets/bistro/images/service/camera.png"},{id:2,url:"assets/bistro/images/service/camera.png"}];

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

  ocorrencia: Complaint;

  dateRegex = /^(((0?[1-9]|[12]\d|3[01])[- /.](0?[13578]|1[02])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)[- /.](0?[13456789]|1[012])[- /.]((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])[- /.]0?2[- /.]((1[6-9]|[2-9]\d)\d{2}))|(29[- /.]02[- /.]((1[6-9]|[2-9]\d)(0?[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  errorMessage = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public viewCtrl: ViewController, private _loadingCtrl: LoadingController ,public alertController:AlertController,
    public appCtrl: AppControllerProvider) {

 
   

    this.form = this.formBuilder.group({
      startTime: ["", Validators.compose([])],
      date: ["", Validators.compose([])],
      name: ["", Validators.compose([])],
      area: ["", Validators.compose([])],
      note: ["", Validators.compose([])],
      phone: ["", Validators.compose([])],
      address: ["", Validators.compose([])],
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
  loading;
  
  showLoading() {
      if(!this.loading){
          this.loading = this._loadingCtrl.create({
              content: 'Aguarde...'
          });
          this.loading.present();
      }
  }
  
  dismissLoading(){
      if(this.loading){
          this.loading.dismiss();
          this.loading = null;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad store admin');
  }
  ionViewDidEnter(){
    this.currentAddress = this.appCtrl.getAddressService().currentAddress;
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


    this.navCtrl.pop();
  }

  continue() {
    if (!this.isSubmited) {
      this.isSubmited = true;
     


      
      this.form.controls.startTime.setValidators(Validators.compose([Validators.required, Validators.pattern(this.timeRegex)]));
      this.form.controls.address.setValidators(Validators.compose([Validators.required]));
      this.form.controls.date.setValidators(Validators.compose([Validators.required, Validators.pattern(this.dateRegex)]));
      this.form.controls.name.setValidators(Validators.compose([Validators.required]));
      this.form.controls.area.setValidators(Validators.compose([Validators.required]));
      this.form.controls.note.setValidators(Validators.compose([Validators.required]));
      this.form.controls.phone.setValidators(Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^\d+$/)]));
      for (let key in this.form.controls) {
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (this.form.valid) {

      this.showLoading();
      let date = new Date();
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
      date.setFullYear(+dateInput[2]);
       date.setMonth(+dateInput[1] - 1);
       date.setDate(+dateInput[0]);
      let startTimeInput = this.startTime.split(":");
      dateStart.setHours(+startTimeInput[0]);
      dateStart.setMinutes(+startTimeInput[1]);
      // console.log(startTimeInput);
      // console.log(this.date);
      // console.log(dateStart.toLocaleDateString(),this.date);
      console.log(this.appCtrl.getAddressService().currentAddress);
      
       
      this.ocorrencia = new Complaint();

      this.ocorrencia.setAddress(this.appCtrl.getAddressService().getCurrentAddress());
      this.ocorrencia.name = this.name;
      this.ocorrencia.startTime = startTimeInput;
      this.ocorrencia.date = dateInput;
      this.ocorrencia.images = this.images;
      this.ocorrencia.phoneNumber = Number(this.phone);
      this.ocorrencia.extInt =  this.extInt;
      this.ocorrencia.area = this.area;
      this.ocorrencia.id = 1;
      


      this.appCtrl.getStoreService().addFireBaseData(this.ocorrencia,"vazamento").then( success =>
        {
                 let mno=this.alertController.create({
                  title:"Recebemos Sua Ocorrência",
                  message:"Solicitação concluida com sucesso",
                  buttons:[{text:'Ok',handler: ()=>{

                    this.navCtrl.pop().then(data => {
                      mno.dismiss();
                      this.dismissLoading();
                    });
                    return false;
                    
                  }}]
                });
                mno.present();
        }).catch( Error =>{
          console.log("ocorreu um erro ao inserir" + JSON.stringify(Error));
          let mno=this.alertController.create({
            title:"Ops! Sua Ocorrência não foi conclúida :(",
            message:"Erro ao inserir registro" ,
            buttons:[{text:'Ok',handler: ()=>{
              mno.dismiss();
              this.dismissLoading();
              this.viewCtrl.dismiss();
              this.navCtrl.pop();
              return false;
            }}]
          });
     
          }
        );
     




    }
    else{
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
        if (this.form.controls.startTime.errors && this.form.controls.startTime.errors.hasOwnProperty("pattern")) fields.push("Hora");
        if (this.form.controls.date.errors && this.form.controls.endTime.errors.hasOwnProperty("pattern")) fields.push("Data");
        if (this.form.controls.name.errors && this.form.controls.name.errors.hasOwnProperty("pattern")) fields.push("Nome");
        if (this.form.controls.phone.errors && this.form.controls.phone.errors.hasOwnProperty("pattern")) fields.push("Número de telefone");
        if (this.form.controls.note.errors && this.form.controls.note.errors.hasOwnProperty("pattern")) fields.push("Descrição");
        
        this.errorMessage = fields.join(', ') + " Estão Incorretos ";
        console.log(fields);
    }

  }
}


  selectInterno(){
    this.extInt = "interno";
  }
  selectExterno(){
    this.extInt = "externo";
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
  return "Informe o Local do Vazamento";
}

pickPlace(event) {
  this.navCtrl.push("DcFindPlacePage");
}


uploadFoto(image:any) {
   
  this.showLoading();
 
    this.appCtrl.getStoreService().selectPhoto().then( data =>{
     var res = data;
     this.url = String(res);
      console.log(this.url);
    
      this.images[image.id].url = this.url;
      console.log(this.images);
      this.dismissLoading();

    }).catch( Error => {
      this.dismissLoading();
    });
    this.countFotos++;
    

 
}

}
