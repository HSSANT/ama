import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from "../classes/store";
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Complaint } from '../classes/complaint';
import { AlertController } from 'ionic-angular';


@Injectable()
export class StoreServiceProvider {
  name: BehaviorSubject<string|null>;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public images:string[];
  private imageSrc: string;
  items: Observable<any[]>;
  stores: Array<Store> = [];
  complaint: Array<Complaint> = [];
  dataVersion: number = 0;
  dataChangeHandler: any;
  opt:Store = new Store();
  constructor(public http: Http,
    private db: AngularFireDatabase,
    public alertCtrl:AlertController,
    private camera: Camera,
  ) {
    this.myPhotosRef = firebase.storage().ref('/Photos/');
    this.myPhotoURL = "";
   
  }




//   

//CAMERA METHODS

public selectPhoto()  {
  return new Promise((resolve,reject)=>{
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecione Camera ou Galeria');

    alert.addInput({
      type: 'radio',
      label: 'Camera',
      value: 'camera',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Galeria',
      value: 'galery',
      checked: true
    });

    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log(data);
 
       if(data == 'galery'){
          this.takeGalery().then( data=>{
            resolve(this.myPhotoURL);
          });
        }
        else{
          this.takeCamera().then( data=>{
            resolve(this.myPhotoURL);
          });
        }

       
     
      }
    })
    alert.addButton({
      text: 'cancel',
      handler: data => {
       alert.dismiss();
      }
    });
    
    alert.present();

      
    });
  }
      
      


    



  private uploadPhoto() {
    return new Promise((resolve,reject)=>{
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
      
         this.myPhotoURL = savedPicture.downloadURL;
         console.log(this.myPhotoURL);
         resolve(this.myPhotoURL);
      }, error => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
  })
}

  takeGalery() {
    return new Promise((resolve,reject)=>{
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto().then(data =>{
        resolve(this.myPhotoURL);
      });
     
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    })});
  }

  takeCamera(){
    return new Promise((resolve,reject)=>{
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.myPhoto = imageData;
      this.uploadPhoto().then(data =>{
        resolve(this.myPhotoURL);
      });
     
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    })});
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
      firebase.database().ref("/vazamento").once("value",(snapshot)=>{
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



 //Metodos de Consulta Firebase
 getComplaintPromisse(){
  let complaint = new Array<Complaint>();
  let data = [];
  return new Promise((resolve,reject)=>{
    firebase.database().ref("/vazamento").once("value",(snapshot)=>{
      let head = snapshot.val();
       data = head.value;
      for (const key in data) {
        complaint.push((data[key]));
 
      } 
      resolve(complaint);
    }).catch((err)=>{
      resolve(false);
    })
  });
}


getAllCompliants(){
  return new Promise((resolve,reject)=>{
    firebase.database().ref('/vazamento').once('value',(snapshot)=>{
      if(snapshot){
        let data = snapshot.val();
        let temp = [];
        for (const key in data) {
          temp.push(new Complaint(data[key]));              
        }
        resolve(temp);
      }
    }).catch((err)=>{
      alert(err);
      resolve(0);
    })
  })
}

getComplaint():Array<Complaint> {
  this.getComplaintPromisse().then((res: any) => {
    if (res) {
      this.complaint = res;
    } else {
      console.log("getFirebase: lista  vazia");
    }
  }).catch((err) => { })
  return this.complaint
}


  //Metodos de insercao Firebase

  addFireBaseData(data : any,table:string) {
    return new Promise((resolve,reject)=>{
      firebase.database().ref("/"+ table).push(data).then(()=>{
        resolve({sucess: true});
      })
    });
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
