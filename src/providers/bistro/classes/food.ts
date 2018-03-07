
import { Utils } from '../../app-utils'
import { AssetsUrl } from '../app-constant'

export class Food {
    id: number;
    category: number;
    store:number;
    titleVie: string;
    titleEng: string;
    price: number;
    image: string;
    currency: string;
    option: string;
    size: string;
    description: string;
    wattingTime: number;
    keyWord: string;
    status: number;//0: Not available; 1: available
    parallelFoods: Array<OrderedFood>;
    constructor(id: number, category: number,store:number, titleVie: string, titleEng: string, price?: number,
        image?: string, currency?: string, description?: string, option?: string, size?: string,
        wattingTime?: number) {
        this.id = id;
        this.category = category;
        this.store = store;
        this.titleVie = Utils.capitalizeFirstLetter(titleEng);
        this.titleEng = titleEng;
        this.price = (price ? price : 0);
        this.image = (image ? AssetsUrl.FOOD_IMG + image : AssetsUrl.NO_IMAGE);
        this.currency = (currency ? currency : "VNĐ");
        this.option = (option ? option : "");
        this.size = (size ? size : "");
        this.description = (description ? description : "");
        this.wattingTime = (wattingTime ? wattingTime : 0);
        let shortTitle = titleVie.toLowerCase().split(' ').map(elm => { return elm.charAt(0) }).join('');
        this.keyWord = titleVie.toLowerCase() + "._." + Utils.bodauTiengViet(titleVie.toLowerCase() + "._." + shortTitle);
        this.status = 1;
    }
    cloneFrom(otherFood: Food) {
        this.id = otherFood.id;
        this.category = otherFood.category;
        this.store = otherFood.store;
        this.titleVie = otherFood.titleVie;
        this.titleEng = otherFood.titleEng;
        this.description = otherFood.description;
        this.option = otherFood.option;
        this.size = otherFood.size;
        this.currency = otherFood.currency;
        this.image = otherFood.image;
        this.keyWord = otherFood.keyWord;
        this.parallelFoods = [];
        if(otherFood.parallelFoods){
            otherFood.parallelFoods.forEach(element => {
                let temFood = new OrderedFood(0, 0, 0, "", "");
                temFood.cloneFrom(element);
                this.parallelFoods.push(temFood);
            });
        }       
        this.price = otherFood.price;
        this.status = otherFood.status;
        this.wattingTime = otherFood.wattingTime;
    }
    toString() {
        return this.titleVie;
    }
}

export class OrderedFood extends Food {
    quantily: number = 0;
    note: string = "";
    constructor(
        id: number, category: number, store:number,titleVie: string, titleEng: string, price?: number,
        image?: string, currency?: string, description?: string, option?: string, size?: string,
        wattingTime?: number, quantily?: number, note?: string
    ) {
        super(id, category, store,titleVie, titleEng, price, image, currency, description, option, size, wattingTime);
        this.quantily = (quantily ? quantily : 0);
        this.note = (note ? note : "");
    }
    cloneFrom(otherFood: OrderedFood) {
        Food.prototype.cloneFrom.call(this, otherFood);
        this.quantily = otherFood.quantily;
        this.note = otherFood.note;
    }
}