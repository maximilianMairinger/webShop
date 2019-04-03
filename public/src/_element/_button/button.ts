import Element from "./../element";
import Tel from "./../../lib/typedEventListener/index";


const activeClass = "active";

export default class Button extends Element {
  private doesFocusOnHover: boolean;
  private mouseOverListener: Tel;
  private mouseOutListener: Tel;
  private callbacks: Function[] = [];
  protected active: boolean;

  private _enabled: boolean;
  constructor(activationCallback?: Function, enabled:boolean = true, focusOnHover:boolean = false, public tabIndex: number = 0, public obtainDefault: boolean = false, public preventFocus = false, blurOnMouseOut: boolean = false) {
    super(false, false);

    this.enabled = enabled;

    let alreadyPressed = false;

    this.on("mousedown", (e) => {
      if (e.which === 1) this.click(e);
    });
    this.on("mouseup", () => {
      this.removeClass(activeClass);
    });
    this.on("mouseout", () => {
      this.removeClass(activeClass);
    })
    this.on("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") if (!alreadyPressed) {
        alreadyPressed = true;
        this.click(e)
      }
    });
    this.on("keyup", ({key}) => {
      if (key === " " || key === "Enter"){
        alreadyPressed = false;
        this.removeClass(activeClass);
      }
    });
    this.on("blur", () => {
      alreadyPressed = false;
    });

    this.mouseOverListener = new Tel(this, "mouseover", () => {
      this.focus();
    }, false);
    this.mouseOutListener = new Tel(this, "mouseout", () => {
      this.blur();
    }, false);

    this.addActivationCallback(activationCallback);
    this.focusOnHover = focusOnHover;
    this.blurOnMouseOut = blurOnMouseOut;
  }
  public set blurOnMouseOut(to: boolean) {
    if (to) this.mouseOutListener.patch();
    else this.mouseOutListener.dispatch();
  }
  public addActivationCallback(cb?: Function) {
    if (cb !== undefined) this.callbacks.add(cb);
  }
  public removeActivationCallback(cb?: Function) {
    if (cb !== undefined) this.callbacks.removeV(cb);
  }
  public set focusOnHover(to: boolean) {
    this.doesFocusOnHover = to;
    if (to) {
      this.mouseOverListener.patch();
      this.mouseOutListener.patch();
    }
    else {
      this.mouseOverListener.dispatch();
      this.mouseOutListener.dispatch();
    }
  }
  public get focusOnHover(): boolean {
    return this.doesFocusOnHover;
  }
  public set enabled(to: boolean) {
    this._enabled = to;
    if (to) this.css("cursor", "pointer");
    else this.css("cursor", "default");
  }
  public get enabled() {
    return this._enabled;
  }
  public disable() {
    this.enabled = false;
  }
  public click(e?: Event) {
    if (e !== undefined && !this.obtainDefault) e.preventDefault();
    if (this.enabled) {
      if (!this.preventFocus) this.focus();
      this.addClass(activeClass);
      this.callbacks.forEach(f => {f(e);});
    }
  }
  stl() {
    return require('./button.css').toString();
  }
}

window.customElements.define('c-button', Button);
