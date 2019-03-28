import Page from "./../page";
import LoginWindow from "./../../../_window/loginWindow/loginWindow";
import RegisterWindow from "./../../../_window/registerWindow/registerWindow";
import Footer from "./../../../drifter/drifter";
import {post} from "../../../../lib/ajax/ajax";
import Notifier from "../../../../lib/notifier/notifier";



export default class loginPage extends Page {
  private footContainer: HTMLElement;
  private foot: Footer;

  private loginElem: LoginWindow;
  private registerElem: RegisterWindow;
  constructor(public logedInCb?: Function) {
    super();
    this.registerElem = new RegisterWindow(async (username: string, password: string, email: string, fullName: string) => {
      let res = await post("register", {body: {
        username,
        password,
        email,
        fullName
      }});
      if (!res.suc) Notifier.error("That did not work.");
      else {
        localStorage.sessKey = res.sessKey;
        Notifier.success(true, "You have successfully created an account under the username " + username + ".");
        if (this.logedInCb !== undefined) this.logedInCb()
      }
    }, () => {
      this.window = "login";
    });
    this.loginElem = new LoginWindow(async (username: string, password: string) => {
      let res = await post("auth", {body: {
        username,
        password
      }});

      if (!res.suc) Notifier.log(true, "Your username of password is not correct.");
      else {
        localStorage.sessKey = res.sessKey;
        if (this.logedInCb !== undefined) this.logedInCb();
      }
    }, () => {
      this.window = "register";
    });


    this.footContainer = ce("login-panel-foot-container");

    this.sra(this.footContainer, this.loginElem, this.registerElem);





    import("./../../../drifter/drifter").then(({default: foot}) => {
      this.foot = new foot();
      this.footContainer.apd(this.foot);
      this.foot.start();
    });
  }
  public set window(to: "login" | "register") {
    if (to === "login") {
      this.loginElem.show();
      this.registerElem.hide();
    }
    else {
      this.loginElem.hide();
      this.registerElem.show();
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
