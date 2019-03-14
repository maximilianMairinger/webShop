import Element from "./../element";


// TODO: Clean up
export default class Notification extends Element {

    private side:           HTMLElement;
    private infoTitleSec:   HTMLElement;
    private infoText:       HTMLElement;
    private infoIcon:       HTMLElement;
    private infoClose:      HTMLElement;
    private infoCloseAll:   HTMLElement;
    private infoTitleOpts:  HTMLElement;
    private headingText:    HTMLElement;

    public closing: boolean = false;

    private _type: "information" | "success" | "error";

    constructor(heading?: string, message?: string, type?: "information" | "success" | "error", public onClose?: Function, public onCloseAll?: Function) {
      super();

      this.side =           dc("notification-side");
      this.infoIcon =       dc("notification-icon");
      let infoSec =         dc("notification-section");
      this.infoTitleSec =   dc("notification-heading-section");
      this.headingText =    dc("notification-heading-text");
      this.infoTitleOpts =  dc("notification-heading-options");
      this.infoClose  =     dc("notification-close-button");
      this.infoText =       dc("info-text");

      this.infoClose.css("background-image","url(./assets/close.svg");
      this.infoClose.on("click", () => {if (this.onClose !== undefined) this.onClose(this)});

      this.infoTitleOpts.apd(this.infoClose);
      this.infoTitleSec.apd(this.headingText, this.infoTitleOpts);
      infoSec.append(this.infoTitleSec);
      if(message != "") infoSec.apd(this.infoText);
      this.side.append(this.infoIcon);
      this.sra(this.side, infoSec);

      if (heading !== undefined) this.heading = heading;
      if (message !== undefined) this.msg = message;
      if (type !== undefined) this.type = type;
    }

    public set heading(to: string) {
      this.headingText.html = to;
    }
    public get heading(): string {
      return this.headingText.html;
    }
    public set msg(to: string) {
      this.infoText.html = to;
    }
    public get msg(): string {
      return this.infoText.html;
    }
    public set type(to: "information" | "success" | "error") {
      this._type = to;
      switch(to) {
        case "information":
          this.setItNow("#1282E6","#7EBEF7","#9fccf4","#163D80","#6ea0cc","./assets/information.svg");
        break;
        case "success":
          this.setItNow("#2AA143","#72DA87","#8bf4a0","#36774A","#60b270","./assets/checked.svg");
        break;
        case "error":
          this.setItNow("#d13b2e","#e89d96","#efbbb6","#841f0e","#d18e88","./assets/fire1.svg");
        break;
        }
    }
    public get type() {
      return this._type;
    }

    public addCloseAllOption():void {
        this.infoCloseAll= dc("notification-close-all");
        this.infoCloseAll.html ="Close all";
        this.infoTitleOpts.append(this.infoCloseAll);
        this.infoCloseAll.on("click", () => {if (this.onCloseAll !== undefined) this.onCloseAll()});
    }

    public close() {
      this.infoClose.click();
    }

    public removeCloseAllOption():void {
      this.infoCloseAll.remove();
    }

    public hasCloseAll():boolean {
      return this.infoCloseAll !== undefined;
    }

    /*
     * TODO: Use classed.
     */
    private setItNow(sideColor: string, titleSecColor: string, infoTextBColor: string, textColor: string, borderColor:string, imgSrc: string):void {
        this.side.css("background-color",sideColor);
        this.infoTitleSec.css("background-color",titleSecColor);
        this.infoTitleSec.css("color",textColor);
        this.infoTitleSec.css("border-bottom","1px solid " + borderColor);
        this.infoText.css("background-color",infoTextBColor);
        this.infoText.css("color",textColor);
        this.infoIcon.css("background-image","url(" + imgSrc + ")");
    }

    stl() {
      return require('./notification.css').toString();
    }


}

window.customElements.define('c-notification', Notification);
