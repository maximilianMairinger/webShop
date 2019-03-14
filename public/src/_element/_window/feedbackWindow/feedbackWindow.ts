import Window from "./../window";
import lang, {fc} from "./../../../lib/language/language";
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

    lang("report_a_bug", (text: string) => {
      this.textElem.html = fc(text);
    }, 1)

    this.submit = new BlockButton("",() => {console.log("btn pressed")});
    lang("submit", (text: string) =>
      {this.submit.text = fc(text)
    },1);

    this.sra(this.textElem, wrapper,this.submit);
    wrapper.apd(this.textArea);

  }

  stl() {
    return super.stl() + require('./feedbackWindow.css').toString();
  }
}
window.customElements.define('c-feedback-window', FeedbackWindow);
