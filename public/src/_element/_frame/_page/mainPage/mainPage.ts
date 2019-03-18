import Page from "./../page";
import PanelManager from "./../../../_frame/_manager/panelManager/panelManager";
import Nav from "./../../../nav/nav";
import * as Hammer from "hammerjs";

//IMPORTANT: This needs to be the nav width when the nav is swapable (the screen is small).
let navWidth = 300;


export default class Main extends Page {
  private nav: Nav;
  private panelManager: PanelManager;
  private overlay: HTMLElement;
  private navOpenSelector: HTMLElement;

  private panelName: string;
  private hotkeyIndex: object = {};
  private _swapableNav: boolean;
  private inResizeAnimation: boolean = false;

  public animationOptions = {duration: 300, easing: "ease"};


  //add Sunday & saturday to types or make given information just numbers (0-6)
  constructor(panelName: string = "newArticle") {
    super();

    this.overlay = ce("main-page-overlay");
    this.navOpenSelector = ce("main-page-nav-open-selector");

    this.nav = new Nav((panelName: string) => {
      this.setPanel(panelName);
      if (this.swapableNav) this.setNavOpen(false);
    });
    this.panelManager = new PanelManager(panelName, () => {this.nav.focus();});

    this.sra(this.overlay, this.navOpenSelector, this.nav, this.panelManager);



    //guestures

    let lastX: number = 0;

    let guesturef = (e) => {
      if (this.swapableNav) {
        let navpos = parseInt(this.nav.css("marginLeft"));
        let difX = e.deltaX - lastX + navpos;
        if (difX >= 0) this.setNavPos(0);
        else {
          //OPTIMIZE
          //@ts-ignore
          this.setNavPos(difX);
        }
      }
      lastX = e.deltaX;
      if (e.isFinal) {
        lastX = 0;
        this.setNavOpen(e.velocityX >= 0);
      }
    }
    new Hammer(this.navOpenSelector, {inputClass: Hammer.TouchInput}).on("pan", guesturef);
    new Hammer(this.overlay, {inputClass: Hammer.TouchInput}).on("pan", guesturef);
    new Hammer(this.nav, {inputClass: Hammer.TouchInput}).on("pan", guesturef);



    this.overlay.on("click", () => {
      if (this.swapableNav) this.setNavOpen(false);
    });


    this.hotkeyIndex["Digit1"] = "shop";
    this.hotkeyIndex["Digit2"] = "newArticle";


    this.nav.activateOption(panelName);

    this.on("keydown", (e) => {
      for(let digit in this.hotkeyIndex) {
        if (digit === e.code) this.setPanel(this.hotkeyIndex[digit]);
      }
    });
  }
  private setNavPos(px: any) {
    let navOutPercent = (px + navWidth) / navWidth;
    this.nav.css("marginLeft", px);
    if (navOutPercent > 0) this.overlay.css("display", "block");
    else this.overlay.css("display", "none");
    this.overlay.css("opacity", (px + navWidth) / navWidth);
  }
  private async setNavOpen (to: boolean) {
    let anim: Promise<any>;
    if (to) {
      let anims = [this.nav.anim({marginLeft: 0}, this.animationOptions)];
      if (this.swapableNav) {
        this.overlay.css("display", "block");
        anims.add(this.overlay.anim({opacity: 1}, this.animationOptions));
      }
      anim = Promise.all(anims);
    }
    else {
      let anims = [this.nav.anim({marginLeft: -this.nav.outerWidth}, this.animationOptions)];
      if (this.swapableNav) {
        anims.add(this.overlay.anim({opacity: 0}, this.animationOptions).then(() => {
          this.overlay.css("display", "none");
        }));
      }
      anim = Promise.all(anims);
    }
    await anim;
  }
  async onResize() {
    if (this.active) {
      if (!this.inResizeAnimation) {
        this.inResizeAnimation = true;
        let sw = this.width < 600;
        if (sw !== this.swapableNav) {
          if (!sw) this.swapableNav = sw;
          await Promise.all([
            this.overlay.anim({opacity: 0}, this.animationOptions).then(() => {
              this.overlay.css("display", "none");
            }),
            this.setNavOpen(!sw).then(() => {
              this.swapableNav = sw;
              this.inResizeAnimation = false;
            })
          ]);
          //Wanted change could have changed while in animation -> call again since it wont execute anything when nothing has changed
          this.onResize();
        }
        this.swapableNav = sw;
        this.inResizeAnimation = false;
      }
    }
  }
  public async setPanel(panelName: string) {
    this.panelName = panelName;
    await this.panelManager.setPanel(panelName);
    this.nav.activateOption(panelName);
  }
  public get panel(): string {
    return this.panelName;
  }
  protected async activationCallback(active: boolean): Promise<void> {
    this.onResize();
    this.nav.focus();
    this.nav.onResize();
    this.panelManager.vate(active);
  }
  stl() {
    return super.stl() + require('./mainPage.css').toString();
  }
  private set swapableNav(to: boolean) {
    this._swapableNav = to;
    if (to) {
      this.panelManager.addClass("small");
    }
    else {
      this.panelManager.removeClass("small");
    }
  }
  private get swapableNav() {
    return this._swapableNav;
  }
}

window.customElements.define('c-main-page', Main);
