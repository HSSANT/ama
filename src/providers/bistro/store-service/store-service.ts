import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from "../classes/store";
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class StoreServiceProvider {
  name: BehaviorSubject<string|null>;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  private imageSrc: string;
  items: Observable<any[]>;
  stores: Array<Store> = [];
  dataVersion: number = 0;
  dataChangeHandler: any;
  constructor(public http: Http,
    private db: AngularFireDatabase,
    private camera: Camera
  ) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.items = db.list('/stores').valueChanges();
    db.list('/stores').push("123");
 
  }

//CAMERA METHODS

  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


  //END OF CAMERA METHODS
  



  updateData(version: number, data) {
    if (version > this.dataVersion) {
      this.resetData();
      this.dataVersion = version;
      for (let store of data) {
        let temStore = new Store(store["id"], store["name"]);
        this.stores.push(temStore);
      }
    }
    this.broadcastChange(this.stores);
  }

  getList() {
    this.db.list('/stores', ref => ref.orderByChild('name'));
  }

  getSingleItem(id) {
    
  }
  


  onDataChange(handler) {
    this.dataChangeHandler = handler;
  }

  broadcastChange(data) {
    if (this.dataChangeHandler) this.dataChangeHandler(data);
  } 

  resetData() {
    this.stores = [];
  }

  getAllStores(): Array<Store> {
    return this.stores;
  }

}
