export class BookedSeat {
    date: Date;
    numberOfPerson: number = 0;
    userName: string = "";
    userPhone: string = "";
    note: string = "";
    constructor(date: Date, numberOfPerson: number, userName?: string, userPhone?: string, note?: string) {
        this.date = date;
        this.numberOfPerson = numberOfPerson;
        this.userName = (userName ? userName : "");
        this.userPhone = (userPhone ? userPhone : "");
        this.note = (note ? note : "");
    }
}

