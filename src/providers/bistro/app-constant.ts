export class AssetsUrl {
    public static DATA: string = "assets/bistro/data/data.json";
    public static CONFIG: string = "assets/bistro/data/config.json";
    public static FOOD_IMG: string = "assets/bistro/images/food/";
    public static NO_IMAGE: string = "http://www.nosun.co.za/wp-content/themes/sistina/core/assets/images/no-featured-175.jpg";
}
export class APIUrl {
    public static CLIENT_KEY: string = "Hello, its me";
    public static GEOCODE_URL: string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=$latlng&sensor=true";
    public static PROVINCE: string = "/app/provinces";
    public static CUSTOMER_REGISTER: string = "/customer/register";
    public static CUSTOMER_LOGIN_BY_ACCOUNT: string = "/customer/login/account";
    public static CUSTOMER_LOGGIN_BY_OPENID: string = "/customer/login/openid";
    public static USER_LOGIN: string = "/user/login";
    public static STAFF_LIST: string = "/staff/list";
    public static RESTAURANT_LIVE_QUERY: string = "/restaurant/live/query";
    public static RESTAURANT_LIST_LOCATON: string = "/restaurant/list/locations";
    public static RESTAURANT_ACCESSPOINT_RESTID: string = "/restaurant/accesspoint/rest_id";
    public static RESTAURANT_DETAIL: string = "/restaurant_detail";
    public static MENU_CATEGORY: string = "/menu/categories";
    public static MENU_LIST_QUERY: string = "/menu/list/query";
    public static COUPON_LIST: string = "/coupon/list";
    public static VENDOR_LIST: string = "/vendor/list";
    public static VENDOR_DETAIL: string = "/vendor/detail";
}

export class ParamsKey {
    public static FIRST_NAME: string = "first_name";
    public static LAST_NAME: string = "last_name";
    public static EMAIL: string = "email";
    public static PHONE: string = "phone";
    public static PASSWORD: string = "password";
    public static SIGN: string = "sign";
    public static ACCOUNT: string = "account";
    public static OPENID: string = "openid";
    public static USER_NAME: string = "user_name";
    public static VENDOR_ID: string = "vendor_id";
    public static REST_ID: string = "rest_id";
    public static CITY: string = "city";
    public static KEYWORD: string = "keyword";
    public static LAT: string = "lat";
    public static LNG: string = "lng";
    public static RANGE: string = "range";
    public static ACCESSPOINT: string = "accesspoint";
    public static CATEGORY_ID: string = "category_id";
    public static IS_FOOD: string = "is_food";
    public static PROVINCE_ID: string = "province_id";
}

export class ResponseCode {
    public static ERROR_CODE: number = 0;
    public static SUCCESS_CODE: number = 1;
}