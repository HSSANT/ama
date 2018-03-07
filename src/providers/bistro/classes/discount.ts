export class Discount {
    title: string;
    image: string;
    startTime: Date;
    endTime: Date;
    content: string;
    store: string;
    constructor(title: string, image: string, startTime: Date, endTime: Date, content: string, store:string) {
        this.title = title;
        this.image = image;
        this.startTime = startTime;
        this.endTime = endTime;
        this.content = content;
        this.store = store;
    }
}