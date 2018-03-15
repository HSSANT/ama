export class Address {
    address: string;
    name: string;
    lat: number;
    lng: number;
    time: Date; 
    state:string;
    city:string;
    zone:string;
    neighborhood:string;

    //TODO: Colocar padrao OPT
    constructor(title: string, name?: string, lat?: number, lng?: number, time?: Date) {
        this.address = title;
        this.name = (name ? name : "");
        this.lat = (lat ? lat : 0);
        this.lng = (lng ? lng : 0);
        this.time = (time ? time : new Date(2018,1,1));
        this.state = "state";
        this.city = "city";
        this.zone = "zone";
        this.neighborhood="neighborhood";

    }
}