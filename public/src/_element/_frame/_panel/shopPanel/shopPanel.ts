import Panel from "./../panel";
import Article from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import {get} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";

export default class ShopPanel extends Panel {
  private body: HTMLElement = ce("shop-panel-body");
  constructor(blurCallback?: Function) {
    super(blurCallback);

    (async () => {
      let articles = await get("articles");
      articles = articles.map(data => new Article(data));
      this.body.apd(...articles);
    })();


    this.sra(this.body);
  }
  protected activationCallback(active: boolean): void {

  }

  stl() {
    return super.stl() + require('./shopPanel.css').toString();
  }
}
window.customElements.define('c-shop-panel', ShopPanel);
