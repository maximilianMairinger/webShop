import Window from "./../window";
import Input from "../../input/input";
import Upload from "../../_button/upload/upload";
import Button from "../../_button/_rippleButton/blockButton/blockButton";

export default class ArticleDisplayWindow extends Window {
  constructor({name, stock, description, price, weight, picture}: Article) {
    super();

    let img = ce("img");
    img.src = picture;


    let body = ce("article-display-body");
    let fade = ce("article-display-gradient");
    let text = ce("article-display-text");
    text.inner = "Name: " + name + "<br>Price: " + price + "<br>Weight: " + weight + "<br>Stock: " + stock + "<br>Description: " + description;


    body.apd(img, fade, text);
    this.sra(body);
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
