import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Address } from '../../../providers/bistro/classes/address';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-dc-find-place',
  templateUrl: 'dc-find-place.html',
})
export class DcFindPlacePage {
  placholder = "Encontre o Lugar...";
  tab = "google";
  searchKeyword = "";
  searchOldKeyWord = "";
  map: GoogleMap;
  scrollContent: HTMLElement;
  searchResultElement: HTMLElement;

  currentAddress: Address;
  recentAddress: Array<Address> = [];
  favouriteAddress: Array<Address> = [];
  addressResult: Array<Address> = [];
  mapAddress: Address;
  currentDate: Date;

  isMapDragging = false;
  iconClasses = ["button-favourite", "button-non-favourite"];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private googleMaps: GoogleMaps,
    private ngZone: NgZone,
    private changeDetector: ChangeDetectorRef) {
    this.currentDate = new Date();
  }

  ionViewDidLoad() {
    this.loadMap();
    this.loadAddress();
    this.scrollContent = <HTMLElement>document.querySelector('#dc-find-place-content .scroll-content');
    console.log("scrollContent style", this.scrollContent.style);
    if (this.scrollContent) {
      this.scrollContent.style.setProperty("background-color", "#FFF", "important");
    }
    this.searchResultElement = document.getElementById('dc-place-search-result');
  }

  loadMap() {
    let mapElement = document.getElementById('dc-find-place-map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30,
      },
      controls: {
        mapToolbar: false,
        myLocationButton: false,
        indoorPicker: false,
        compass: false
      },
      mapType: "MAP_TYPE_NORMAL"
    };
    this.map = this.googleMaps.create(mapElement, mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.setVisible(false);
        this.gotoMyLocation();
        this.map.on(GoogleMapsEvent.MAP_DRAG_START).subscribe(() => {
          this.isMapDragging = true;
          this.changeDetector.detectChanges();
        })
        this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          let center = this.map.getCameraTarget();
          this.appController.getAddressService().searchPlaceByPosition(center.lat, center.lng).then(data => {
            this.isMapDragging = false;
            if (data.length > 0) this.mapAddress = data[0];
            else this.mapAddress = undefined;
            this.changeDetector.detectChanges();
          }, error => {
            this.isMapDragging = false;
            this.mapAddress = undefined;
            this.changeDetector.detectChanges();
          });
        })
      })
  }

  loadAddress() {
    this.currentAddress = this.appController.getAddressService().getCurrentAddress();
    this.recentAddress = [...this.appController.getAddressService().getRecentAddress()];
    console.log(this.recentAddress);
    this.recentAddress.reverse();
    console.log(this.recentAddress);
    this.loadFavouriteAddess();
  }

  loadFavouriteAddess() {
    this.favouriteAddress = [...this.appController.getAddressService().getFavouriteAddress()];
  }


  search() { 
    if (this.searchResultElement && this.searchKeyword) {
      if (this.searchKeyword == this.searchOldKeyWord) return;
      else {
        this.searchOldKeyWord = this.searchKeyword;
        this.appController.getAddressService().searchPlaceByName(this.searchKeyword, this.searchResultElement)
          .then(data => {
            this.addressResult = data;
          }, () => {
            console.log("error")
          });
      }
    }
  }

  tabChange() {
    if (this.tab == "map") {
      if (this.scrollContent) {
        this.scrollContent.style.setProperty("background-color", "transparent", "important");
      }
      if (this.map) {
        this.map.setVisible(true);
      }
    } else {
      if (this.map) {
        this.map.setVisible(false);
      }
      this.loadFavouriteAddess();
    }
  }

  getDiffTime(date: Date) {
    let diffTime = Math.floor(Math.abs(this.currentDate.getTime() - date.getTime()) / 1000 / 60);//in minute
    if (diffTime < 60) {
      return diffTime + " Minutos Atrás";
    }
    if (diffTime < 60 * 24) {
      return Math.floor(diffTime / 60) + " Horas Atrás";
    }
    return Math.floor(diffTime / 60 / 24) + " No Dia Atrás";
  }

  selectItem(address: Address) {
    this.appController.getAddressService().setCurrentAddress(address);
    if (this.scrollContent) {
      this.scrollContent.style.setProperty("background-color", "#FFF", "important");
    }
    this.navCtrl.pop();
  }

  mapFavouriteClick(address, htmlElement) {
    if (address) {
      this.toggleClass(htmlElement);
      if (htmlElement.classList.contains(this.iconClasses[0])) {
        //add to favourite
        this.appController.getAddressService().addFavouriteAddress(address);
      } else {
        //remove from favourite
        this.appController.getAddressService().removeItemFavouriteAddress(address);
      }
    }
  }

  favouriteIconClick(address, htmlElement, event) {
    this.toggleClass(htmlElement);
    event.preventDefault();
    event.stopPropagation();
    if (htmlElement.classList.contains(this.iconClasses[0])) {
      //add to favourite
      this.appController.getAddressService().addFavouriteAddress(address);
    } else {
      //remove from favourite
      this.appController.getAddressService().removeItemFavouriteAddress(address);
    }
  }

  toggleClass(element) {
    element.classList.toggle('button-non-favourite');
    element.classList.toggle('button-favourite');
  }

  gotoMyLocation() {
    if (this.map) {
      this.isMapDragging = true;
      this.map.getMyLocation().then(data => {

        this.appController.getAddressService().searchPlaceByPosition(data.latLng.lat, data.latLng.lng).then(data => {
          this.isMapDragging = false;
          if (data.length > 0) this.mapAddress = data[0];
          else this.mapAddress = undefined;
          this.changeDetector.detectChanges();
        }, error => {
          this.mapAddress = undefined;
          this.isMapDragging = false;
          this.changeDetector.detectChanges();
        });
        this.map.animateCamera({
          target: data.latLng,
          duration: 300
        });
      })
    }
  }
  confirmPlace() {
    console.log("confirm", this.isMapDragging, this.mapAddress);
    this.appController.getAddressService().setCurrentAddress(this.mapAddress);
    if (this.scrollContent) {
      this.scrollContent.style.setProperty("background-color", "#FFF", "important");
    }
    this.navCtrl.pop();
  }

}
