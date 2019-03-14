import Panel from "./../panel";
import Btn from "../../../_button/logoButton/logoButton";

export default class BiOptionPanel extends Panel {
  private leftButton: Btn;
  private righButton: Btn;

  private lbcb: Function;
  private rbcb: Function;
  constructor(b1: {cb: Function, path: string}, b2: {cb: Function, path: string}, blurCallback?: Function) {
    super(blurCallback);

    this.lbcb = b1.cb;
    this.rbcb = b2.cb;

    this.leftButton = new Btn(b1.path,true,this.lbcb);
    this.righButton = new Btn(b2.path,false,this.rbcb);

    this.sra(this.leftButton, this.righButton);
  }



  protected activationCallback(active: boolean): void {
    //throw new Error("Method not implemented.");
  }

  public setLeftButton(b: {cb: Function, path: string}) {
    this.leftButton.setPathToImg(b.path);
    this.leftButton.removeActivationCallback(this.lbcb);
    this.lbcb = b.cb;
    this.leftButton.addActivationCallback(this.lbcb);
  }

  public setRightButton(b: {cb: Function, path: string}) {
    this.righButton.setPathToImg(b.path);
    this.righButton.removeActivationCallback(this.rbcb);
    this.rbcb = b.cb;
    this.righButton.addActivationCallback(this.rbcb);
  }

  stl() {
    return super.stl() + require('./biOptionPanel.css').toString();
  }
}
window.customElements.define('c-bi-option-panel', BiOptionPanel);
