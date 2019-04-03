import Window from "./../window";
import Button from "../../_button/button";

export default class ArticleDisplayWindow extends Window {
  private textElem: HTMLElement;
  private btn: Button;
  constructor(text: string , picture: string, public submitcb?: Function, enabled: boolean = true) {
    super();

    let img = ce("img");
    img.src = picture;

    this.btn = new Button(() => {if (this.submitcb !== undefined) this.submitcb()});


    let body = ce("article-display-body");
    let fade = ce("article-display-gradient");
    this.textElem = ce("article-display-text");

    body.apd(img, fade, this.textElem);
    this.sra(body, this.btn);

    this.text = text;
    this.enabled = enabled;
  }
  public set enabled(to: boolean) {
    this.btn.enabled = to;
    if (!to) this.css("opacity", .5);
    else this.css("opacity", 1);
  }
  public set text(to: string) {
    this.textElem.inner = to;
  }
  stl() {
    return super.stl() + require('./articleDisplayWindow.css').toString();
  }
}
window.customElements.define('c-article-display-window', ArticleDisplayWindow);
