
import { Utils } from "../../app-utils";
import { Address } from "./address";





export class Complaint {
    key:string;
    id: number;
    name: string;
    extInt:string;
    area:string;
    note:string;
    startTime: string[];
    date:string[];
    dateFormated:Date;
    address:Address;
    phoneNumber:number;
    difDate:number;
    images:any[];
    dateView:string;

    constructor(opts?: any) {
        this.id = 0;
        this.name = "Ocorencia";
        this.images = [{id:0,url:"assets/bistro/images/service/camera.png"},{id:1,url:"assets/bistro/images/service/camera.png"},{id:2,url:"assets/bistro/images/service/camera.png"}]
        this.address = new Address("st","",0,0, new Date(2018,1));
        if(opts){
            this.pair(opts);
        }
        
    }
    pair(opts: any){
        if(opts.id) this.id = opts.id;
        if(opts.name) this.name = opts.name;
        if(opts.images) this.images = opts.images;
        if(opts.extInt) this.extInt = opts.extInt;
        if(opts.area) this.area = opts.area;
        if(opts.note) this.note = opts.note;
      
        if(opts.address) this.address = opts.address;
        if(opts.startTime) this.startTime = opts.startTime;
        if(opts.date) {
            this.date = opts.date;
            this.dateFormated = new Date(opts.date[2],opts.date[1],opts.date[0]);
            this.difDate = Utils.getTimeDiff(this.dateFormated);
            if(opts.date[1]){
                var monthNames = Utils.monthNames;
                console.log(monthNames)
               var monthName = monthNames[opts.date[1]-1];
               this.dateView = monthName +  " " + opts.date[0] + ", "+ opts.date[2];
            }
        }
        if(opts.phoneNumber) this.phoneNumber = opts.phoneNumber;

    }
    setAddress(opts:any){
        if(opts.address) this.address = opts;
  
    }

    
}