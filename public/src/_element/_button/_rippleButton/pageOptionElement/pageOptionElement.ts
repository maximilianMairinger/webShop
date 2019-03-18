import RippleButton from "./../rippleButton";
import delay from "./../../../../lib/delay/delay"


export default class PageOptionsElement extends RippleButton {
  private textElem: HTMLElement;
  private _isActive: boolean = false;
  constructor(text?: string, callback?: Function) {
    super(async (e) => {
      e.prevFocusActiveOption = "PageOptionsElement";
      //Easter egg
      //------------------------------------
      delay(1000).then(() => {
        pressedInASecond = 0;
      });
      pressedInASecond++;
      if (pressedInASecond === 8 && !disabled) {
        disabled = true;
        await this.rocket();
        disabled = false;
        pressedInASecond = 0;
      }
    });
    let disabled = false;
    let pressedInASecond = 0;
    //-----------------------------------

    this.addActivationCallback(callback);

    this.textElem = dc("page-option-element-text");
    if (text !== undefined) this.text = text;
    this.sra(this.textElem);
  }
  public async rocket(){
    await this.anim({marginLeft: 0, color: "red"}, {duration: 2000});
    await this.anim({marginLeft: -100, color: "orange"}, {duration: 2000, easing: "ease"});
    await delay(1000);
    await this.anim({marginLeft: 500, color: "blue"}, {easing: "ease-in"});
    this.css({marginLeft: -500, color: "inherit"});
    await delay(500);
    await this.anim({marginLeft: 0}, {duration: 1500, easing: "ease-out"});
    return;
  }
  public set text(to:string) {
    this.textElem.html = to;
  }
  public get text():string {
    return this.textElem.html;
  }
  public activate() {
    this._isActive = true;
    this.addClass("panelActive");
  }
  public get isActive():boolean {
    return this._isActive;
  }
  public deactivate() {
    if (!this.isActive) return;
    this._isActive = false;
    this.removeClass("panelActive");
  }
  stl() {
    return super.stl() + require('./pageOptionElement.css').toString();
  }
}
window.customElements.define('c-page-options-element', PageOptionsElement);
