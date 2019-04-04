import Panel from "./../panel";
import Article from "../../../_window/articleDisplayWindow/articleDisplayWindow";
import {get, post} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";
import Button from "../../../_button/_rippleButton/blockButton/blockButton";
//@ts-ignore
import swal from "sweetalert";
import delay from "../../../../lib/delay/delay";

export default class cartPanel extends Panel {
  private body: HTMLElement = ce("shop-panel-body");
  constructor(public toShopCb: Function, blurCallback?: Function, fetch: boolean = true) {
    super(blurCallback);

    let btn = new Button("Checkout", async () => {
      if (this.body.html !== "") {
        swal({
          title: "Are you sure?",
          text: "Are you sure you want to proceed to checkout? Once completed you cant recall your order.",
          icon: "info",
          buttons: true,
        })
        .then(async (ok) => {
          if (ok) {
            if ((await post("clearCart")).suc) {
              await this.body.anim({transform: "translateX(20px)", opacity: 0}, {duration: 200, fill: false})
              this.body.inner = "";
              await delay(200);
              swal("Your order has been placed", {
                icon: "success",
              });
            }
            else {
              swal({
                title: "Error",
                text: "Something went wrong. Your order has not been placed.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
            }
          } else {
            swal("Your puchase has been canceled");
          }
        });
      }
      else {
        let shop = await swal({
          title: "Nothing to checkout with.",
          text: "Your cart seems to be empty. Would you like to shop?",
          icon: "info",
          buttons: true,
        });
        if (shop) this.toShopCb();
      }
    });

    this.sra(this.body, btn);
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
window.customElements.define('c-cart-panel', cartPanel);
