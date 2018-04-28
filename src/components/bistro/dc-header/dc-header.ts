import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { User } from '../../../providers/bistro/classes/user';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

@Component({
  selector: 'dc-header',
  templateUrl: 'dc-header.html'
})
export class DcHeaderComponent {
  orderedFood = [];
  searchKeyword = "";
  user: User;
  backButtons = ["assets/bistro/images/main-icon/btn_back.png"];
  logo = ["assets/bistro/images/main-icon/logo.png"];
  @Input()
  placholder = "Procure alimentos, serviços, promoções";
  @Input()
  showSearchBar = true;
  @Input()
  title = "iBookLet";
  @Input()
  showBackButton = false;
  @Input()
  showOrder = true;

  //Just use 1 in 2 following propertives
  @Input()
  backButtonType = 0;
  @Input()
  backButton = "ios-arrow-round-back-outline";

  @Input()
  ionContent;

  @Output()
  onSearch = new EventEmitter<string>();

  constructor(private appController: AppControllerProvider, private navCtrl: NavController) {
  }
  ngAfterViewInit() {
    this.backButton = this.backButtons[this.backButtonType];
    this.user = this.appController.getUserService().getUser();
    this.getOrderLength();
  }
  search() {
    this.onSearch.emit(this.searchKeyword);
  }

  checkOrder() {
    if (this.user.isLoggedIn) {
      this.navCtrl.push("DcOrderPage");
    } else {
      this.navCtrl.push("DcLoginPage");
    }
  }

  getOrderLength() {
    this.orderedFood = this.appController.getFoodService().getOrderedFoods();
  }
  scrollToTop() {
    if (this.ionContent) {
      this.ionContent = this.ionContent as Content;
      this.ionContent.scrollToTop(300);
    }
  }

  openMenu() {
    this.appController.setBackgroundForScrollContent("", "#FFF");
  }
}
