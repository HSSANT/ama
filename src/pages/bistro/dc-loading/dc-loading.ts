import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller';

@IonicPage()
@Component({
  selector: 'page-dc-loading',
  templateUrl: 'dc-loading.html',
})
export class DcLoadingPage {
  private assetSrc = "www/assets/bistro/";
  imageArr = [];
  functionId = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private appController: AppControllerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DcLoadingPage');
    this.loadImageAssets(this.assetSrc).then(data => {
      this.getElementToArray(data);
      this.appController.getResourceLoader().load(this.imageArr).then(() => {
        console.log("done loaded image")
        this.appController.setRootPage("DcServicePage");
      }, error => {
        console.log("loaded image error", error);
        this.appController.setRootPage("DcServicePage");
      })
    }, error => {
      console.log("load image error", error);
      this.appController.setRootPage("DcServicePage");
    });
  }

  loadImageAssets(path): Promise<any> {
    let promises = [];
    this.functionId++;
    console.log("id", this.functionId, path);
    let myId = this.functionId;
    return new Promise((resolve, reject) => {
      this.file.listDir(this.file.applicationDirectory, path)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            let element = data[i];
            if (element.isFile) {
              let fileName = element.name;
              if (fileName.includes(".png") || fileName.includes(".jpg") || fileName.includes(".gif") || fileName.includes(".svg")) {
                let filePath = element.fullPath;
                if (filePath.startsWith('/www/')) {
                  filePath = filePath.substr(5);
                }
                promises.push(filePath);
              }
            }
            if (element.isDirectory) {
              let directoryPath = element.fullPath;
              if (directoryPath.startsWith('/')) directoryPath = directoryPath.substr(1);
              promises.push(this.loadImageAssets(directoryPath));
            }
          }
          Promise.all(promises).then(data => {
            resolve(data);
            if (myId == this.functionId) {
              console.log("I'm done", myId, path);
            }
          }, error => {
            reject(error)
          })
        }).catch(err => {
          console.log("fail to load file", err);
          reject(err);
        });
    })
  }

  getElementToArray(arr: Array<any>) {
    arr.forEach(element => {
      if (element instanceof Array) {
        this.getElementToArray(element);
      } else {
        this.imageArr.push(element);
      }
    });
  }

}
