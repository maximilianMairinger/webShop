import Window from "./../window";
import Input from "../../input/input";
import Upload from "../../_button/upload/upload";
import Button from "../../_button/_rippleButton/blockButton/blockButton";

export default class ArticleDisplayWindow extends Window {
  constructor(article: Article) {
    super();

    let img = ce("img");
    img.src = article.picture;


    let body = ce("article-display-body");


    body.apd(img);
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
