import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

@IonicPage()
@Component({
  selector: 'page-dc-service',
  templateUrl: 'dc-service.html',
})
export class DcServicePage {



  // serviceItems = [
  //   {
  //     title: "Reserva",
  //     des: "Por favor, reserve pelo menos 1 hora antes da chegada para obter o melhor serviço",
  //     icon: "icon_booking.png",
  //     page: "DcTakeSeatPage"
  //   },
  //   {
  //     title: "Entrega",
  //     des: "Pagamento e entrega em dinheiro ou cartão de crédito, Paypal",
  //     icon: "icon_ship.png",
  //     page: "DcShipPage"
  //   },
  //   {
  //     title: "Ajuda no Local",
  //     des: "O pessoal do restaurante será imediatamente enviado à sua mesa para receber o pedido",
  //     icon: "icon_help.png",
  //     page: "DcSupportPage"
  //   },
  //   {
  //     title: "Chamar táxi",
  //     des: "Os táxis estarão disponíveis dentro de 5-10 minutos",
  //     icon: "icon_taxi.png",
  //     page: "DcTaxiPage"
  //   },
  // ]
  

  serviceItems = [
    {
      title: "Oque há por perto",
      des: "Use o serviço de localização para encontrar as melhores ofertas próximas a você",
      icon: "icon_nearme.png",
      page: "DcTaxiPage"
    },
    {
      title: "Faça aqui sua busca",
      des: "Encontre promoções",
      icon: "icon_paidsearch.png",
      page: "DcHomePage"
    },
    {
      title: "Quero colocar meu comércio no iBookLet",
      des: "Preencha nosso formulário e aguarde nosso contato",
      icon: "icon_shopfilled.png",
      page: "DcSupportPage"
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
