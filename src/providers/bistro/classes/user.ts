export class User {
    name: string;
    phone: string;
    password: string;
    isLoggedIn: boolean;
    constructor(phone: string, password: string, name?: string, isLoggedIn?: boolean) {
        this.phone = phone;
        this.password = password;
        this.name = (name ? name : "");
        this.isLoggedIn = (isLoggedIn ? isLoggedIn : false);
    }
    setName(name) {
        this.name = name;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    setPassword(password) {
        this.password = password;
    }
    setLoginStatus(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
    }
}