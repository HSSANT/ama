import { Utils } from "../../app-utils";

export class Store {
    id: number;
    name: string;
    keyword: string;
    urlLogo:string;
    startTime: Date;
    endTime: Date;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        let shortTitle = name.toLowerCase().split(' ').map(elm => { return elm.charAt(0) }).join('');
        this.keyword = name.toLowerCase() + "._." + "._." + shortTitle;
        this.urlLogo = 'assets/bistro/images/store/graydefault.png';
        
    }
}