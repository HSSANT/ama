import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/bistro/components.module';
import { FoodServiceProvider } from '../providers/bistro/food-service/food-service';
import { HttpService } from '../providers/http-service';
import { HttpModule } from '@angular/http';
import { UserServiceProvider } from '../providers/bistro/user-service/user-service';
import { AppControllerProvider } from '../providers/bistro/app-controller/app-controller';
import { CategoryServiceProvider } from '../providers/bistro/category-service/category-service';
import { ServiceProvider } from '../providers/bistro/service/service';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { AddressServiceProvider } from '../providers/bistro/address-service/address-service';
import { DiscountServiceProvider } from '../providers/bistro/discount-service/discount-service';
import { BistroHttpServiceProvider } from '../providers/bistro/bistro-http-service/bistro-http-service';
import { StoreServiceProvider } from '../providers/bistro/store-service/store-service';
import { FIREBASE_CREDENTIALS } from './firebase.credentials.config';
import { Camera } from '@ionic-native/camera';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition'
    }),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FoodServiceProvider,
    HttpService,
    UserServiceProvider,
    AppControllerProvider,
    CategoryServiceProvider,
    ServiceProvider,
    StoreServiceProvider,
    GoogleMaps,
    Geocoder,
    AddressServiceProvider,
    DiscountServiceProvider,
    File,
    BistroHttpServiceProvider
  ]
})
export class AppModule { }
