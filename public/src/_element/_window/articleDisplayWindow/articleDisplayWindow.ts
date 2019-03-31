import Window from "./../window";
import Button from "../../_button/button";

export default class ArticleDisplayWindow extends Window {
  private text: HTMLElement;
  private btn: Button;
  constructor({name, stock, description, price, weight, picture}: Article, public submitcb?: Function) {
    super();

    let img = ce("img");
    img.src = picture;

    this.btn = new Button(() => {if (this.submitcb !== undefined) this.submitcb()});


    let body = ce("article-display-body");
    let fade = ce("article-display-gradient");
    this.text = ce("article-display-text");
    this.text.inner = "Name: <span></span><br>Price: <span></span><br>Weight: <span></span><br>Stock: <span></span><br>Description: <span></span><br>"


    body.apd(img, fade, this.text);
    this.sra(body, this.btn);

    this.name = name;
    this.stock = stock;
    this.description =  description;
    this.price = price;
    this.weight = weight;
  }
  set name(to: string) {
    this.text.childs("span")[0].inner = to;
  }
  set price(to: number) {
    this.text.childs("span")[1].inner = to;
  }
  set weight(to: number) {
    this.text.childs("span")[2].inner = to;
  }
  set stock(to: number) {
    this.text.childs("span")[3].inner = to;
    if (this.stock <= 0) {
      this.btn.enabled = false;
    }
  }
  get stock() {
    return parseFloat(this.text.childs("span")[3].html);
  }
  set description(to: string) {
    this.text.childs("span")[4].inner = "to";
  }

  stl() {
    return super.stl() + require('./articleDisplayWindow.css').toString();
  }
}
window.customElements.define('c-article-display-window', ArticleDisplayWindow);


interface Article {
  name: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
  picture: string;
}
