import Panel from "./../panel";
import Article from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import {get, post} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";
import Button from "../../../_button/_rippleButton/blockButton/blockButton";

export default class ShopPanel extends Panel {
  private body: HTMLElement = ce("shop-panel-body");
  constructor(blurCallback?: Function, fetch: boolean = true) {
    super(blurCallback);

    let btn = new Button("Checkout", () => {
      log("chekcout")
    });

    this.body.apd(btn)

    this.sra(this.body);
    if (fetch) this.fetch();
  }
  protected activationCallback(active: boolean): void {

  }

  public fetch() {
    (async () => {
      let {articles} = await post("getCart");
      articles = articles.map(data => new Article(
        "Name: " + data.name + "<br>Quanitity: " + data.quantity + "<br>Total price: " + (data.price * data.quantity),
        data.picture,
        () => {},
        false
      ).css("opacity", 1));
      this.body.inner = articles;
    })();
  }

  stl() {
    return super.stl() + require('./cartPanel.css').toString();
  }
}
window.customElements.define('c-cart-panel', ShopPanel);
