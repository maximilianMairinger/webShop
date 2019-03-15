import Page from "./../page";
import LoginWindow from "./../../../_window/loginWindow/loginWindow";
import Footer from "./../../../drifter/drifter";
import post from "../../../../lib/post/post";
import Notifier from "../../../../lib/notifier/notifier";



export default class loginPage extends Page {
  private footContainer: HTMLElement;
  private foot: Footer;

  private loginElem: LoginWindow;

  private currentWindow: "register" | "login" = "login";
  constructor(public logedInCb: Function) {
    super();
    this.loginElem = new LoginWindow(async (username: string, password: string) => {
      let res = await post(this.currentWindow === "register" ? "register" : "auth", {body: {
        username,
        password
      }});
      if (!res.suc) {
        if (this.currentWindow === "register") {
          Notifier.error(true, "That did not work. It seems like someone else has got this username already.");
        }
        else {
          Notifier.log(true, "Your username of password is not correct.");
        }
      }
    }, "Login", () => {
      let register = this.currentWindow === "login";
      this.currentWindow = !register ? "login" : "register";
      if (register) {
        this.loginElem.heading = "Register";
        this.loginElem.chnageBtnTxt = "Login";
      }
      else {
        this.loginElem.heading = "Login";
        this.loginElem.chnageBtnTxt = "Register";
      }
    }, "Register");


    this.footContainer = ce("login-panel-foot-container");

    this.sra(this.footContainer, this.loginElem);





    import("./../../../drifter/drifter").then(({default: foot}) => {
      this.foot = new foot();
      this.footContainer.apd(this.foot);
      this.foot.start();
    });
  }
  protected activationCallback(active: boolean): void {
    this.loginElem.focusUsername();
  }
  stl() {
    return super.stl() + require('./loginPage.css').toString();
  }
}

window.customElements.define('c-login-page', loginPage);
