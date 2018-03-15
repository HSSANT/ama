import { Utils } from "../../app-utils";
import { Address } from "./address";

export class Store {
    key:string;
    id: number;
    name: string;
    keyword: string;
    urlLogo:string;
    startTime: string;
    endTime: string;
    address:Address;
    phoneNumber:number;

    constructor(opts?: any) {
        this.id = 0;
        this.name = "Mercado XPTO";
        let shortTitle = this.name.toLowerCase().split(' ').map(elm => { return elm.charAt(0) }).join('');
        this.keyword = this.name.toLowerCase() + "._." + "._." + shortTitle;
        this.urlLogo = 'assets/bistro/images/store/graydefault.png';
        this.address = new Address("","",0,0,undefined);
        if(opts){
            this.pair(opts);
        }
        
    }
    pair(opts: any){
        if(opts.name) this.name = opts.name;
        if(opts.urlLogo) this.urlLogo = opts.urlLogo;
        if(opts.address) this.address = opts.address;
        if(opts.startTime) this.startTime = opts.startTime;
        if(opts.endTime) this.endTime = opts.endTime;
        if(opts.phoneNumber) this.phoneNumber = opts.phoneNumber;

    }
    setAddress(opts:any){
        if(opts.state) this.address.state = opts.state;
        if(opts.city) this.address.city = opts.city;
        if(opts.neighborhood) this.address.neighborhood = opts.neighborhood;
        if(opts.zone) this.address.zone = opts.zone;
    }

    
}