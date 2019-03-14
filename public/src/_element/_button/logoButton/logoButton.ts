
import Button from './../button';

/**
 * Button that takes up half of the screen and has an image in the center.
 */
export default class BiOptionButton extends Button {
  private imgCont: HTMLElement;
  private orientation: boolean;
  private pathToImg: string;

  constructor(pathToImg: string, orientation: boolean, buttonPressedCallback?: Function,) {
    super(buttonPressedCallback, true, true);
    this.blurOnMouseOut = true;
    this.imgCont = ce("bi-option-img-container");
    //img
    this.pathToImg = pathToImg;
    this.imgCont.css("background-image", this.pathToImg);

    //border
    this.setOrientation(orientation);

    this.sra(this.imgCont);
  }

  public setOrientation(to: boolean) {
    this.orientation = to;
    this.css("border", "none");

    if (to) this.css("border-right", "2px solid #F1F1F1");
    else this.css("border-left", "2px solid #F1F1F1");
  }
  public getOrientation(): boolean {
    return this.orientation;
  }

  public setPathToImg(to: string) {
    this.pathToImg = to;
    this.imgCont.css("background-image",this.pathToImg);
  }

  public getPathToImg() : string {
    return this.pathToImg;
  }
  stl() {
    return super.stl() + require('./logoButton.css').toString();
  }


}
window.customElements.define('c-bi-option-button', BiOptionButton);
