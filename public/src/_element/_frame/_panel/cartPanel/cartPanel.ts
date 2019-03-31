import Panel from "./../panel";
import Article from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import {get, post} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";

export default class ShopPanel extends Panel {
  private body: HTMLElement = ce("shop-panel-body");
  constructor(blurCallback?: Function) {
    super(blurCallback);

    this.sra(this.body);
    this.fetchArticles();
  }
  protected activationCallback(active: boolean): void {

  }

  public fetchArticles() {
    (async () => {
      let {articles} = await post("getCart");
      articles = articles.map(data => new Article(data));
      this.body.inner = articles;
    })();
  }

  stl() {
    return super.stl() + require('./cartPanel.css').toString();
  }
}
window.customElements.define('c-cart-panel', ShopPanel);
