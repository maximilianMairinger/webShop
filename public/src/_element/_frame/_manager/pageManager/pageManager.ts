import Manager from "./../manager";
import Page from "./../../_page/page";
import Noti from "./../../../../lib/notifier/notifier";
import delay from "./../../../../lib/delay/delay";
import Notification from "./../../../notification/notification";
import { setWeek } from "../../../../lib/unit/unit";
import lazyLoad, { ImportanceMap, Import } from "./../../../../lib/lazyLoad/lazyLoad";


export default class PageManager extends Manager {
  protected currentFrame: Page;

  private currentPageName: "login" | "main" | "settings";
  private nextPageName: "login" | "main" | "settings";

  private pages: Map<string, Promise<any>>;
  constructor(pageKey: "login" | "main" | "settings" = "login") {
    super();

    const impMap = new ImportanceMap<() => Promise<object>>(
      {key: new Import<string>("login", 1, (Login) => {
        return new Login((username: string, password: string) => {
          let isItLoadedYet = false;
          let holdOnNoti: Notification;
          delay(1).then(() => {
            if (!isItLoadedYet) holdOnNoti = Noti.log(true, "Hold on please. The main application hasnt loaded yet.");
          });
          this.pages.get("main").then(() => {
            isItLoadedYet = true;
            if (holdOnNoti !== undefined) holdOnNoti.close();
          });

          //test
          if (username === "qwer" && password === "qwer") {
            this.pages.get("main").then(() => {
              setWeek("1");
              this.page = "main";
            });
          }
        });
      }), val: () => {return import("./../../_page/loginPage/loginPage")}},
      {key: new Import<string>("main", 2, (Main) => {
        return new Main("overview");
      }), val: () => {return import("./../../_page/mainPage/mainPage")}}
    );

    const load = lazyLoad(impMap);

    this.pages = load(e => {this.body.apd(e)}, pageKey);


    this.page = pageKey;
  }
  public set page(to: "login" | "main" | "settings") {
    this.nextPageName = to;
    this.pages.get(to).then((mod) => {
      if (to === this.nextPageName) {
        this.setPage(mod);
        this.currentPageName = to;
      }
    });
  }
  public get page(): "login" | "main" | "settings" {
    return this.currentPageName;
  }
  private setPage(to) {
    this.swapFrame(to);
  }
  stl() {
    return super.stl() + require('./pageManager.css').toString();
  }
  protected activationCallback(active: boolean): void {

  }
}

window.customElements.define('c-page-manager', PageManager);
