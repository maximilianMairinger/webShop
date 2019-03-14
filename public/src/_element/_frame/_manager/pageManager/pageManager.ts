import Manager from "./../manager";
import Page from "./../../_page/page";
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
        return new Login(() => {
          console.log("logged in");
        });
      }), val: () => {return import("./../../_page/loginPage/loginPage")}},
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
