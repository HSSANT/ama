import { Component, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller'
import { Category } from '../../../providers/bistro/classes/category';
import { Food, OrderedFood } from '../../../providers/bistro/classes/food';

@IonicPage()
@Component({
  selector: 'page-dc-menu',
  templateUrl: 'dc-menu.html',
})
export class DcMenuPage {
  categories: Array<Category> = [];
  showCategories: Array<Category> = [];
  categoryColors = [
    {
      color: "#194e1f",
      background: "#29cc3d",
    },
    {
      color: "#699a97",
      background: "#b4e2e0",
    },
    {
      color: "#90990a",
      background: "#dde657",
    },
    {
      color: "#ab6100",
      background: "#ffc300",
    },
    {
      color: "#bb6d61",
      background: "#fac1b8",
    },
    {
      color: "#7B1FA2",
      background: "#BA68C8",
    },
    {
      color: "#BF360C",
      background: "#FF8A65",
    },
  ];
  categoryIcon = [
    '<i class="fa fa-sun-o" aria-hidden="true"></i>',
    '<i class="fa fa-coffee" aria-hidden="true"></i>',
    '<i class="fa fa-cutlery" aria-hidden="true"></i>',
    '<i class="fa fa-lemon-o" aria-hidden="true"></i>',
    '<i class="fa fa-birthday-cake" aria-hidden="true"></i>',
    '<i class="fa fa-paw" aria-hidden="true"></i>',
    '<i class="fa fa-envira" aria-hidden="true"></i>'
  ];
  selectedCategory: Category;

  foods: Array<OrderedFood> = [];
  currentIndex = 0;
  numberOfFoodPerScreen = 6;
  keyword: string = "";
  onLoadMore = false;
  isMaxItem = false;
  debounceTime = 100;

  quickMenu: HTMLElement;
  scrollToActiveItem = true;

  @ViewChildren('items') items: QueryList<any>;
  @ViewChildren('foodItems') foodItems: QueryList<any>;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    public event: Events) {
    this.selectedCategory = new Category(0, "", "");
    //Why need to wait menu close. Because page transition make page translate X and it item will now be in the viewport 
    event.subscribe('close-menu', () => {
      console.log("close-menu fired");
      this.animateMenuElement();
    });
  }

  ionViewDidLoad() {
    //Check menu item change for scroll to active item
    this.items.changes.subscribe(event => {
      console.log("change");
      if (this.scrollToActiveItem) {
        event._results.forEach((elementRef: ElementRef) => {
          if (elementRef.nativeElement.id == "quick-menu-item-" + this.selectedCategory.id) {
            console.log("selected", this.selectedCategory.id);
            this.quickMenu.scrollLeft = elementRef.nativeElement.offsetLeft;
          }
        });
      }
      //animate item when scroll
      this.animateFoodElement();
    })

    //Check for food item change to animate
    this.foodItems.changes.subscribe(event => {
      this.animateFoodElement();
    })

    //load categories
    this.getAllCategorires();
    //load foods
    this.loadMoreFoods();
    //get quick-menu element
    this.quickMenu = <HTMLElement>document.getElementById("quick-menu");

    //animate food
    this.animateFoodElement();
    //animate food when scroll
    this.content.ionScroll.subscribe(() => {
      this.animateFoodElement();
    })

    //animate menu when scroll
    if (this.quickMenu) {
      this.quickMenu.addEventListener('scroll', () => {
        this.animateMenuElement();
      })
    }
  }


  animateMenuElement() {
    let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let items = this.quickMenu.getElementsByClassName('item');
    for (let i = 0; i < items.length; i++) {
      let item = <HTMLElement>items.item(i);
      if (!item.classList.contains("animated") && this.appController.isElementInViewPort(item, viewPortWidth, viewPortHeight, 2, true, true)) {
        item.classList.add("animated", "zoomIn");
        item.addEventListener('animationend', () => {
          item.style.animationDuration = "0ms";
        })
        item.addEventListener('oAnimationEnd', () => {
          item.style.animationDuration = "0ms";
        })
        item.addEventListener('webkitAnimationEnd', () => {
          item.style.animationDuration = "0ms";
        })
      }
    }
  }

  animateFoodElement() {
    let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let foods = document.getElementsByClassName('food-item');
    for (let i = 0; i < foods.length; i++) {
      let food = <HTMLElement>foods.item(i);
      if (!food.classList.contains("animated") && this.appController.isElementInViewPort(food, viewPortWidth, viewPortHeight, 1, true, true)) {
        food.classList.add("animated", "fadeIn");
        food.addEventListener('animationend', () => {
          food.style.animationDuration = "0ms";
        })
        food.addEventListener('oAnimationEnd', () => {
          food.style.animationDuration = "0ms";
        })
        food.addEventListener('webkitAnimationEnd', () => {
          food.style.animationDuration = "0ms";
        })
      }
    }
  }


  getAllCategorires() {
    this.categories = this.appController.getCategoryService().getAllCategories();
    this.selectedCategory = this.categories[0];
    for (let i = 0; i < this.categories.length; i++) {
      let category = this.categories[i];
      category["icon"] = this.categoryIcon[i % 7];
      category["color"] = this.categoryColors[i % 7].color;
      category["background"] = this.categoryColors[i % 7].background;
      this.showCategories.push(category);
    }
    // this.showCategories = [...this.categories];
    if (this.navParams.get("category")) {
      this.selectedCategory = this.navParams.get("category");
    }
  }

  menuClick(category) {
    this.scrollToActiveItem = false;
    if (this.selectedCategory.id == category.id) return;
    this.selectedCategory = category;
    this.createDefault();
    this.scrollToActiveItem = false;
    this.loadMoreFoods();

  }

  changeFoodQuantily(item, quantily) {
    item["quantily"] = quantily;
  }

  doInfinite(infiniteScroll) {
    if (this.onLoadMore) {
      infiniteScroll.complete();
      return;
    }
    this.loadMoreFoods(infiniteScroll);
  }

  loadMoreFoods(infiniteScroll?) {
    this.onLoadMore = true;
    this.appController.getFoodService().getFoodByCategory(this.selectedCategory, this.keyword,
      this.currentIndex, this.numberOfFoodPerScreen).subscribe(data => {

        if (data) {
          if (data.length == 0) {
            this.isMaxItem = true;
            return;
          }

          for (var i = 0; i < data.length; i++) {
            let food = data[i] as OrderedFood;
            food["quantily"] = 0;
            // food["note"] = "";
            this.foods.push(food);
            this.currentIndex++;
          }
          if (infiniteScroll) infiniteScroll.complete();
          this.onLoadMore = false;
          return;
        }
      })
  }

  createDefault() {
    this.currentIndex = 0;
    this.foods = [];
    this.isMaxItem = false;
    this.scrollToActiveItem = true;
  }


  onSearch(keyword: string) {
    this.createDefault();
    this.keyword = keyword;
    this.showCategories = this.categories.filter(elm => {
      return elm.keyword.includes(keyword.toLowerCase().trim()) || elm.id == this.selectedCategory.id;
    })
    this.loadMoreFoods();
  }

  gotoDetail(food) {
    this.navCtrl.push("FoodDetailPage", { food: food });
  }

}
