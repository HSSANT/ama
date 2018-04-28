import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Menu, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppControllerProvider } from '../providers/bistro/app-controller/app-controller';
import { User } from '../providers/bistro/classes/user';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = 'DcHomePage';
  rootPage: any = 'DcLoadingPage';
  user: User;
  menuItems = [

  ]
  @ViewChild(Menu) menu: Menu;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private app: App,
    private appController: AppControllerProvider,
    public event: Events
  ) {
    this.appController.onMenuItemChange((menuItems) => { 
      this.menuItems = menuItems;
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#bb2b33");
     
      splashScreen.hide();
    });
  }
  ngAfterViewInit() {
    this.menu.ionOpen.subscribe(event => {
      // this.setMenuZIndex(1);
    })

    this.menu.onBackdropClick = () => {
      this.closeMenu();
    }
    this.user = this.appController.getUserService().getUser();
    this.menuItems = this.appController.getMenuItems(); 
  }
 

  itemClick(menuItem) {
    this.appController.pushPage(menuItem.page);
    this.closeMenu();
  }

  setMenuZIndex(zIndex) {
    this.menu.getNativeElement().style.zIndex = zIndex + "";
  }
  gotoLogin() {
    this.closeMenu();
    this.app.getActiveNav().push("DcLoginPage");
  }
  gotoHelp() {
    
    this.appController.setRootPage("DcSupportPage");
    this.closeMenu();
  }

  gotoRegister() {
    this.closeMenu();
    this.app.getActiveNav().push("DcRegisterPage");
  }

  GoToGuide(){
    this.closeMenu();
    this.app.getActiveNav().push("GuidePage");
  }
  closeMenu(): Promise<any> {
    this.setMenuZIndex(0);
    return this.menuCtrl.close().then(() => {
      this.appController.setBackgroundForScrollContent("", "");
      this.event.publish('close-menu');
    });
  }

  logOut() {
    this.appController.getUserService().logOut();
  }
}

