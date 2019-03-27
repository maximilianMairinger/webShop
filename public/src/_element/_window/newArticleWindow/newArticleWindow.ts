import Window from "./../window";
import Input from "../../input/input";
import Upload from "../../_button/upload/upload";
import Button from "../../_button/_rippleButton/blockButton/blockButton";

export default class NewArticleWindow extends Window {
  constructor(public submitCb?: Function) {
    super("#1620aa", "top");
    let cb = async () => {
      if (this.submitCb !== undefined) this.submitCb(nameIn.value, priceIn.value, weightIn.value, stockIn.value, descriptionIn.value, await imgIn.getAsBase64());
    };

    let imgIn = new Upload("img");
    let nameIn = new Input("Name", "text", cb);
    let weightIn = new Input("Weight", "number", cb);
    let stockIn = new Input("Stock", "number", cb);
    let priceIn = new Input("Price", "number", cb);
    let descriptionIn = ce("textarea");
    descriptionIn.placeholder = "Description";



    this.sra(imgIn, nameIn, priceIn, weightIn, stockIn, descriptionIn, new Button("Add", cb));
  }

  stl() {
    return super.stl() + require('./newArticleWindow.css').toString();
  }
}
window.customElements.define('c-new-article-window', NewArticleWindow);
