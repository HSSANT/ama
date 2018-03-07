export class Address {
    address: string;
    name: string;
    lat: number;
    lng: number;
    time: Date; //Thời gian đi
    constructor(title: string, name?: string, lat?: number, lng?: number, time?: Date) {
        this.address = title;
        this.name = (name ? name : "");
        this.lat = (lat ? lat : 0);
        this.lng = (lng ? lng : 0);
        this.time = (time ? time : undefined);
    }
}