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
  opt:Store = new Store();
  constructor(public http: Http,
    private db: AngularFireDatabase,
    private camera: Camera
  ) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
   
   
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
       this.opt.id = store["id"];
       this.opt.name = store["name"]
        let temStore = new Store(this.opt);
        this.stores.push(temStore);
      }
    }
    this.broadcastChange(this.stores);
  }

 //Metodos de Consulta Firebase
  getStoresPromisse(){
    let stores = new Array<Store>();
    let data = [];
    return new Promise((resolve,reject)=>{
      firebase.database().ref("/stores").once("value",(snapshot)=>{
        data = snapshot.val();
        for (const key in data) {
          stores.push(new Store(data[key],));
        } 
        resolve(stores);
      }).catch((err)=>{
        resolve(false);
      })
    });
  }

  getStores():Array<Store> {
    this.getStoresPromisse().then((res: any) => {
      if (res) {
        this.stores = res;
      } else {
        console.log("getStores: lista de loja vazia");
      }
    }).catch((err) => { })
    return this.stores
  }


  //Metodos de insercao Firebase

  addStorePromise(store : Store) {
    return new Promise((resolve,reject)=>{
      firebase.database().ref("/stores").push(store).then(()=>{
        resolve({sucess: true});
      })
    });
  }

  addStore(store:Store):Boolean{
    let returnCode = false
    this.addStorePromise(store).then((res: any)=>{
    if(res.sucess){
      returnCode = true
    }else{
      returnCode = false
    }
  });
    return returnCode;
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
