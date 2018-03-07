import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController, Content } from 'ionic-angular';
import { AppControllerProvider } from '../../../providers/bistro/app-controller/app-controller'
import { Food } from '../../../providers/bistro/classes/food';
import { Category } from '../../../providers/bistro/classes/category';
import { Discount } from '../../../providers/bistro/classes/discount';

declare var videojs: any;
@IonicPage()
@Component({
  selector: 'page-dc-home',
  templateUrl: 'dc-home.html',
})

export class DcHomePage {
  discounts: Array<Discount> = [];
  categories: Array<Category> = [];
  showCategories: Array<Category> = [];
  categoryPerPage: number = 4;
  categoryIndex: number = 0;
  categoryDebounceTime = 300;
  onLoadMore = false;
  keyword: string = "";
  isEntered = false;

  sections: any;//section items

  viewPortWidth: number = 0;
  viewPortHeight: number = 0;
  scrollDebounceTime = 100;
  onScroll = false;
  animationFrame: any;
  timeOut: any;
  lastTime: number = 0;
  @ViewChildren('itemCategory') itemCategories: QueryList<any>;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    //Subcrisebe for categories change
    this.itemCategories.changes.subscribe(event => {
      this.sections = document.getElementsByClassName('dc-section');
      this.animateSectionElement();
      console.log("change");
    })

    //Load data
    this.createDefault();
    this.loadCategories();
    this.getAllDiscount();
    this.appController.getCategoryService().onDataChange((data) => {
      this.createDefault();
      if (data) this.categories = data;
      this.loadMoreCategory();
    });
    // this.testRequest();
  }

  ionViewDidEnter() {
    if (!this.isEntered) {
      //Viewport width and height
      this.viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      //First animate exits elements
      this.animateSectionElement();
      //detect scroll event
      this.detectScroll();

      //Catch scroll event
      this.content.ionScrollEnd.subscribe(() => {
        this.animateSectionElement();
      });
      this.content.ionScrollStart.subscribe(() => {
        this.animateSectionElement();
      });
      let scrollContent = document.querySelector("#dc-home-content .scroll-content");
      if (scrollContent) {
        scrollContent.addEventListener("scroll", () => {
          if (!this.timeOut) {
            this.timeOut = setTimeout(() => {
              this.onScroll = true;
            }, this.scrollDebounceTime)
          }
        }, <any>{ capture: true, passive: true });
      }
    }

    this.isEntered = true;
  }

  testRequest() {
    console.log("start test request");
    this.appController.testRequest();
  }

  detectScroll() {
    if (this.onScroll) {
      let lastTime = Date.now();
      console.log("scrolling", lastTime - this.lastTime);
      this.lastTime = lastTime;
      this.onScroll = false;
      this.animateSectionElement();
      if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.timeOut = null;
      }
    }
    let raf = requestAnimationFrame ||
      webkitRequestAnimationFrame
    if (raf) {
      raf(() => {
        this.detectScroll();
      })
    }

  }

  animateSectionElement() {
    if (this.sections) {
      console.log("animate section");
      let elementInViewPort = [];

      //Select all section inviewport
      for (let i = 0; i < this.sections.length; i++) {
        let section = <HTMLElement>this.sections.item(i);
        if (this.appController.isElementInViewPort(section, this.viewPortWidth, this.viewPortHeight, 1, true, false)) {
          elementInViewPort.push(section);
        }
      }
      //Add animationDelay then animate
      for (let i = 0; i < elementInViewPort.length; i++) {
        let section = elementInViewPort[i];
        if (!section.classList.contains("animated")) {
          section.style.animationDelay = i * this.scrollDebounceTime + "ms";
          section.classList.add("animated", "zoomIn");

          section.addEventListener('animationend', () => {
            this.animateItemElement(section, this.viewPortWidth, this.viewPortHeight);
          })
          section.addEventListener('oAnimationEnd', () => {
            this.animateItemElement(section, this.viewPortWidth, this.viewPortHeight);
          })
          section.addEventListener('webkitAnimationEnd', () => {
            this.animateItemElement(section, this.viewPortWidth, this.viewPortHeight);
          })
        }
        else {
          this.animateItemElement(section, this.viewPortWidth, this.viewPortHeight, true);
        }
      }
    }

  }

  animateItemElement(section: HTMLElement, viewPortWidth: number, viewPortHeight: number, noResetAnimationDuration?: boolean) {
    if (!noResetAnimationDuration) { section.style.animationDuration = "0ms"; }
    let scrollContens = section.getElementsByClassName('horizontal-scroll');
    if (scrollContens.length > 0) {
      let scrollContent = <HTMLElement>scrollContens.item(0);

      let items = scrollContent.getElementsByClassName('item');
      let itemInViewPort = []
      for (let j = 0; j < items.length; j++) {
        let item = <HTMLElement>items.item(j);

        if (!item.classList.contains("animated") && this.appController.isElementInViewPort(item, viewPortWidth, viewPortHeight, 2, true, true)) {
          itemInViewPort.push(item);
        }
      }

      for (let j = 0; j < itemInViewPort.length; j++) {
        let item = itemInViewPort[j];
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

      scrollContent.addEventListener('scroll', () => { 
        let itemInViewPort = []
        for (let j = 0; j < items.length; j++) {
          let item = <HTMLElement>items.item(j);

          if (!item.classList.contains("animated") && this.appController.isElementInViewPort(item, viewPortWidth, viewPortHeight, 2, true, true)) {
            itemInViewPort.push(item);
          }
        }

        for (let j = 0; j < itemInViewPort.length; j++) {
          let item = itemInViewPort[j];
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
      })
    }
  }

  createDefault() {
    this.categories = [];
    this.showCategories = [];
    this.categoryPerPage = 4;
    this.categoryIndex = 0;
    this.categoryDebounceTime = 300;
    this.onLoadMore = false;
    this.keyword = "";
  }

  loadCategories() {
    this.categories = this.appController.getCategoryService().getAllCategories();
    this.loadMoreCategory();
  }

  doInfinite(infiniteScroll) {
    if (this.onLoadMore) {
      infiniteScroll.complete();
      return;
    }
    this.loadMoreCategory(infiniteScroll);
  }

  loadMoreCategory(infiniteScroll?) {
    this.onLoadMore = true;
    let categoryCount = this.categoryIndex + this.categoryPerPage;

    for (this.categoryIndex; this.categoryIndex < this.categories.length && this.categoryIndex < categoryCount; this.categoryIndex++) {
      let category = new Category(0, "", "");
      this.appController.cloneSimpleObject(this.categories[this.categoryIndex], category);
      this.showCategories.push(category);
      // this.showCategories.push(this.categories[this.categoryIndex]);
    }
    if (infiniteScroll)
      infiniteScroll.complete();
    this.onLoadMore = false;
  }

  getFoodByCategory(category) {
    let foodObserver = this.appController.getFoodService().getFoodByCategory(category, this.keyword, 0, 6);
    foodObserver.subscribe(data => {
      category["numberOfItems"] = data.length;
    });
    return foodObserver;
  }

  search(keyword) {
    this.createDefault();
    this.categories = this.appController.getCategoryService().getAllCategories();
    this.keyword = keyword;
    this.showCategories = this.categories;
    this.categoryIndex = this.categories.length;
    // this.animateSectionElement()
  }

  getAllDiscount() {
    this.discounts = this.appController.getDiscountService().getAllDiscount();
  }

  gotoDiscountDetail(discount) {
    this.navCtrl.push("DiscountDetailPage", { "discount": discount });
  }

  gotoDetail(food) {
    this.navCtrl.push("FoodDetailPage", { food: food });
  }

  goToMenu(category) {
    this.appController.setRootPage("DcMenuPage", { category: category });
  }

  doRefresh(refresher) {
    this.createDefault();
    this.loadCategories();
    setTimeout(() => {
      this.animateSectionElement();
      refresher.complete();
    }, 1000);
  }

}
