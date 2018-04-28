import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

@IonicPage()
@Component({
  selector: 'page-dc-service',
  templateUrl: 'dc-service.html',
})
export class DcServicePage {


  

  serviceItems = [
    {
      title: "Conta",
      des: "Use o serviço de localização para encontrar as melhores ofertas próximas a você",
      icon: "cpf.png",
      page: ""
    },
    {
      title: "Ocorrências",
      des: "Encontre promoções",
      icon: "alertaexclamacao.png",
      page: "ComplaintPage"
    },
    {
      title: "Vazamento",
      des: "Preencha nosso formulário e aguarde nosso contato",
      icon: "vazamento.png",
      page: "StoreAdminPage"
    },
    {
      title: "Falta de Água",
      des: "Preencha nosso formulário e aguarde nosso contato",
      icon: "faltadeagua.png",
      page: ""
    },
    {
      title: "Guia",
      des: "Preencha nosso formulário e aguarde nosso contato",
      icon: "tutoriais.png",
      page: "GuidePage"
    },
    {
      title: "Contatos",
      des: "Preencha nosso formulário e aguarde nosso contato",
      icon: "contato.png",
      page: "ContactPage"
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,private appController: AppControllerProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcServicePage');
  }

  gotoService(item) {
    if (item.page) {
      if(item.DcMenuPage){
        this.appController.setRootPage(item.page);
      }
      else{
        this.navCtrl.push(item.page);
      }
  
    }
  }
}
