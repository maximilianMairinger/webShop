import Panel from "./../panel";
import NewArticle from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import post from "../../../../lib/post/post";
import Notifier from "../../../../lib/notifier/notifier";

export default class ShopPanel extends Panel {
  constructor(blurCallback?: Function) {
    super(blurCallback);

  }
  protected activationCallback(active: boolean): void {

  }

  stl() {
    return super.stl() + require('./shopPanel.css').toString();
  }
}
window.customElements.define('c-shop-panel', ShopPanel);
