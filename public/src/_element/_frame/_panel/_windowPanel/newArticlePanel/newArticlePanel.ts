import WindowPanel from "./../windowPanel";
import NewArticle from "../../../../_window/newArticleWindow/newArticleWindow";
import post from "../../../../../lib/post/post";
import Notifier from "../../../../../lib/notifier/notifier";

export default class FeedbackPanel extends WindowPanel {
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.window = new NewArticle(async (name, price, weight, stock, description) => {
      let res = await post("addArticle", {
        body: {
          name, price, weight, stock, description
        }
      });
      if (res.suc) Notifier.success(true, "Your Article has successfully been added to the Collection");
      else Notifier.error(true, "Ouch, something didnt work there. Try with different data again.");
    });
  }

  stl() {
    return super.stl() + require('./newArticlePanel.css').toString();
  }
}
window.customElements.define('c-new-article-panel', FeedbackPanel);
