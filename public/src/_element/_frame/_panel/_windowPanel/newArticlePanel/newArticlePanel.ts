import WindowPanel from "./../windowPanel";
import NewArticle from "../../../../_window/newArticleWindow/newArticleWindow";
import post from "../../../../../lib/post/post";

export default class FeedbackPanel extends WindowPanel {
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.window = new NewArticle((name, price, weight, stock, description) => {
      post("addArticle", {
        body: {
          name, price, weight, stock, description
        }
      });
    });
  }

  stl() {
    return super.stl() + require('./newArticlePanel.css').toString();
  }
}
window.customElements.define('c-new-article-panel', FeedbackPanel);
