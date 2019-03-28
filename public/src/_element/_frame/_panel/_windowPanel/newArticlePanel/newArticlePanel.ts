import WindowPanel from "./../windowPanel";
import NewArticle from "../../../../_window/newArticleWindow/newArticleWindow";
import {post} from "../../../../../lib/ajax/ajax";
import Notifier from "../../../../../lib/notifier/notifier";

export default class NewArticlePanel extends WindowPanel {
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.window = new NewArticle(async (name, price, weight, stock, description, picture) => {
      let res;
      try {
        res = await post("addArticle", {
          body: {
            name, price, weight, stock, description, picture
          }
        });
      }
      catch (e) {
        Notifier.error(true, "Network error");
      }

      if (res.suc) Notifier.success(true, "Your Article has successfully been added to the Collection");
      else Notifier.error(true, "Ouch, something didnt work there. Try with different data again.");
    });
  }

  stl() {
    return super.stl() + require('./newArticlePanel.css').toString();
  }
}
window.customElements.define('c-new-article-panel', NewArticlePanel);
