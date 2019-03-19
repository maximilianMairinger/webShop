import Window from "./../window";
import Input from "../../input/input";
import Upload from "../../upload/upload";

export default class FeedbackWindow extends Window {
  private nameIn: Input;
  private description: HTMLTextAreaElement;
  private imgIn: Upload;
  private weight: Input;
  private stock: Input;
  private price: Input;
  constructor() {
    super("#1620aa", "top");
    this.imgIn = new Upload("img");
    this.nameIn = new Input("Name");
    this.weight = new Input("Weight");
    this.stock = new Input("Stock");
    this.price = new Input("Price");
    this.description = ce("textarea");


    this.sra(this.imgIn, this.nameIn, this.price, this.weight, this.stock, this.description);
  }

  stl() {
    return super.stl() + require('./newArticleWindow.css').toString();
  }
}
window.customElements.define('c-new-article-window', FeedbackWindow);
