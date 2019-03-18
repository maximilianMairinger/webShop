import Window from "./../window";
import BlockButton from "./../../_button/_rippleButton/blockButton/blockButton";

export default class FeedbackWindow extends Window {
  private textElem: HTMLElement;
  private textArea: HTMLElement;
  private submit: BlockButton;
  constructor() {
    super("#AB172A", "top");
    this.textElem = ce("report-a-bug-text");
    this.textArea = ce("textarea");
    let wrapper = ce("text-wrapper");

    this.textElem.html = "report_a_bug";

    this.submit = new BlockButton("",() => {console.log("btn pressed")});
    this.submit.text = "submit";

    this.sra(this.textElem, wrapper,this.submit);
    wrapper.apd(this.textArea);

  }

  stl() {
    return super.stl() + require('./newArticleWindow.css').toString();
  }
}
window.customElements.define('c-new-article-window', FeedbackWindow);
