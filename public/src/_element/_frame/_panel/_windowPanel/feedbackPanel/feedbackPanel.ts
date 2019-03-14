import WindowPanel from "./../windowPanel";
import FeedbackWindow from "../../../../_window/feedbackWindow/feedbackWindow";

export default class FeedbackPanel extends WindowPanel {
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.window = new FeedbackWindow();
  }

  stl() {
    return super.stl() + require('./feedbackPanel.css').toString();
  }
}
window.customElements.define('c-feedback-panel', FeedbackPanel);
