import WindowPanel from "./../windowPanel";
import NewArticle from "../../../../_window/newArticleWindow/newArticleWindow";

export default class FeedbackPanel extends WindowPanel {
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.window = new NewArticle();
  }

  stl() {
    return super.stl() + require('./newArticlePanel.css').toString();
  }
}
window.customElements.define('c-new-article-panel', FeedbackPanel);
