import Page from "./../page";
import LoginWindow from "./../../../_window/loginWindow/loginWindow";
import Footer from "./../../../drifter/drifter";
import post from "../../../../lib/post/post";



export default class loginPage extends Page {
  private footContainer: HTMLElement;
  private foot: Footer;

  private loginElem: LoginWindow;
  private regElem: LoginWindow;
  constructor(public logedInCb: Function, startWindow: "register" | "login" = "login") {
    super();
    this.loginElem = new LoginWindow(async (username: string, password: string) => {
      let res = await post("auth", {body: {
        username,
        password
      }});
      console.log(res)

    }, "Login", () => {
      this.window = "register";
      this.regElem.focusUsername();
    }, "Register");

    this.regElem = new LoginWindow(async (username: string, password: string) => {
      let res = await post("register", {body: {
        username,
        password
      }});
      console.log(res);
      this.regElem.clear();
    }, "Register", () => {
      this.window = "login";

      this.loginElem.focusUsername();
    }, "Login", false);


    this.footContainer = ce("login-panel-foot-container");

    this.sra(this.footContainer, this.loginElem, this.regElem);

    this.window = startWindow;




    import("./../../../drifter/drifter").then(({default: foot}) => {
      this.foot = new foot();
      this.footContainer.apd(this.foot);
      this.foot.start();
    });
  }
  public set window(to: "register" | "login") {
    if (to === "register") {
      this.regElem.show();
      this.loginElem.hide();
    }
    else {
      this.loginElem.show();
      this.regElem.hide();
    }
  }
  protected activationCallback(active: boolean): void {
    this.loginElem.focusUsername();
  }
  stl() {
    return super.stl() + require('./loginPage.css').toString();
  }
}

window.customElements.define('c-login-page', loginPage);
