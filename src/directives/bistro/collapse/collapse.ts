import { Directive, ElementRef, Renderer, Input } from '@angular/core';
@Directive({ selector: '[collapse]' })
export class CollapseDirective {
  @Input() collapse: any;
  //Time transistion
  time = ".4s";
  //Button handle click function
  button: HTMLElement;
  //icon of button
  icon: HTMLElement;
  //class added when element is collapsed
  classCollapsed = "collapsed";
  //class of icon to switch
  iconClassToggle = ["fa-angle-up", "fa-angle-down"];
  //element height 
  collapsedHeight = "50px";
  //remove padding or not
  isRemmovePadding = false;
  //element
  element: any;
  //element actual height
  height: number;
  constructor(el: ElementRef, renderer: Renderer) {
    this.element = el.nativeElement;
  }
  ngAfterViewInit() { 
    //Set varible
    if (this.collapse.time) this.time = this.collapse.time;
    if (this.collapse.button) this.button = <HTMLElement>document.getElementById(this.collapse.button);
    if (this.collapse.icon) this.icon = <HTMLElement>document.getElementById(this.collapse.icon);
    if (this.collapse.classCollapsed) this.classCollapsed = this.collapse.classToggle;
    if (this.collapse.iconClassToggle) this.iconClassToggle = this.collapse.iconClassToggle;
    if (this.collapse.collapsedHeight) this.collapsedHeight = this.collapse.collapsedHeight;
    if (this.collapse.isRemmovePadding) this.isRemmovePadding = this.collapse.isRemmovePadding;

    this.element.style.transistionPropertive = "height, padding";
    this.element.style.overflow = "hidden";
    this.element.style.transitionDuration = "0s";
    //Handler button click
    if (this.button) {
      this.button.addEventListener('click', () => {
        this.element.style.transitionDuration = this.time;
        //Caculate full height
        if(!this.height){
          let cloneElm = this.element.cloneNode(true);
          cloneElm.style.height = "auto";
          cloneElm.style.opacity = 0;
          cloneElm.style.position = "absolute";
          cloneElm.style.top = "0";
          cloneElm.style.left = "0";
          cloneElm.style.zIndex = -999;
          cloneElm.style.width = this.element.offsetWidth + "px";
          this.element.parentElement.appendChild(cloneElm);
          this.height = cloneElm.offsetHeight;
          this.element.parentElement.removeChild(cloneElm);
        }  
        //Change icon class
        if (this.icon) {
          for (let i = 0; i < this.iconClassToggle.length; i++) {
            this.icon.classList.toggle(this.iconClassToggle[i]);
          }
        }
        this.element.classList.toggle(this.classCollapsed); 
        //Change element height        
        if (this.element.classList.contains(this.classCollapsed)) {
          //Set padding to 0 because height = 0 div still apear if padding > 0
          this.element.style.height = this.height;
          
          if (this.isRemmovePadding) {
            this.element.style.paddingTop = "0";
            this.element.style.paddingBottom = "0";
          }          
          this.element.style.height = this.collapsedHeight; 
        } else {
          this.element.style.height = this.collapsedHeight; 
          //Remove inline padding
          if (this.isRemmovePadding) {
            this.element.style.paddingTop = "";
            this.element.style.paddingBottom = "";
          }
          this.element.style.height = this.height + "px"; 
        }
      })
    } 
  }
}