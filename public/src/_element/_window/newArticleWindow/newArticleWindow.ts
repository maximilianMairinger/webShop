import Window from "./../window";
import Input from "../../input/input";
import Upload from "../../_button/upload/upload";
import Button from "../../_button/_rippleButton/blockButton/blockButton";

export default class FeedbackWindow extends Window {
  private nameIn: Input;
  private descriptionIn: HTMLTextAreaElement;
  private imgIn: Upload;
  private weightIn: Input;
  private stockIn: Input;
  private priceIn: Input;


  constructor(public submitCb?: Function) {
    super("#1620aa", "top");
    let cb = async () => {
      if (this.submitCb !== undefined) this.submitCb(this.nameIn.value, this.priceIn.value, this.weightIn.value, this.stockIn.value, this.descriptionIn.value, await this.imgIn.getAsBase64());
    };
    this.imgIn = new Upload(["img", "pdf"]);
    this.nameIn = new Input("Name", "text", cb);
    this.weightIn = new Input("Weight", "number", cb);
    this.stockIn = new Input("Stock", "number", cb);
    this.priceIn = new Input("Price", "number", cb);
    this.descriptionIn = ce("textarea");
    this.descriptionIn.placeholder = "Description";



    this.sra(this.imgIn, this.nameIn, this.priceIn, this.weightIn, this.stockIn, this.descriptionIn, new Button("Add", cb));
  }

  stl() {
    return super.stl() + require('./newArticleWindow.css').toString();
  }
}
window.customElements.define('c-new-article-window', FeedbackWindow);
