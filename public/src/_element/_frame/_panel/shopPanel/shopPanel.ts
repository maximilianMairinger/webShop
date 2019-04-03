import Panel from "./../panel";
import Article from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import {get, post} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";

export default class ShopPanel extends Panel {
  private body: HTMLElement = ce("shop-panel-body");
  constructor(blurCallback?: Function, fetch: boolean = true, public boughtCb?: Function) {
    super(blurCallback);

    this.sra(this.body);
    if (fetch) this.fetch();
  }
  protected activationCallback(active: boolean): void {

  }

  public fetch() {
    let t = this;
    (async () => {
      this.body.emptyNodes();
      let articles = await get("articles");
      articles = articles.map(data => new Article("Name: " + data.name + "<br>Price: " + data.price +"<br>Weight: " + data.price + "<br>Stock: " + data.stock + "<br>Description: " + data.description + "<br>", data.picture, function() {
        if (data.stock <= 0) {
          this.enabled = false;
          return;
        }
        if (t.boughtCb !== undefined) t.boughtCb();
        data.stock--;
        this.text = "Name: " + data.name + "<br>Price: " + data.price +"<br>Weight: " + data.price + "<br>Stock: " + data.stock + "<br>Description: " + data.description + "<br>", data.picture;
        post("addToCart", {body: {
          articleName: data.name
        }});
      }, data.stock > 0));

      this.body.apd(...articles);
    })();
  }

  stl() {
    return super.stl() + require('./shopPanel.css').toString();
  }
}
window.customElements.define('c-shop-panel', ShopPanel);
