import Page from "./../page";
import LoginElem from "./../../../_window/loginWindow/loginWindow";
import lang, {fc} from "./../../../../lib/language/language";
import Footer from "./../../../drifter/drifter";


class DayTime {
  constructor(public from: number, public name: string) {

  }
  is(time: number): boolean {
    return time >= this.from;
  }
}

const dayTimes = [
  new DayTime(4, "morning"),
  new DayTime(12, "afternoon"),
  new DayTime(18,"evening")
];
function getDayTime(): string {
  let h = new Date().getHours()
  for (let i = 0; i < dayTimes.length; i++) {
    let w = dayTimes[i].is(h);
    if (!w) return dayTimes[i-1].name || "";
  }
  return dayTimes[dayTimes.length -1].name;
}

export default class loginPage extends Page {
  private footContainer: HTMLElement;
  private foot: Footer;
  private login: LoginElem;

  private preLoadStatus: "start" | "stop" = "stop";
  constructor(public submitCallback?: Function) {
    super();
    this.footContainer = ce("login-panel-foot-container");

    import("./../../../drifter/drifter").then(({default: foot}) => {
      this.foot = new foot();
      this.footContainer.apd(this.foot);
      this.foot[this.preLoadStatus]();
    });

    this.login = new LoginElem((...a) => {
      if (this.submitCallback !== undefined) submitCallback(...a);
    });
    lang(["dayTimes.good", "dayTimes." + getDayTime()], (good, time) => {
      this.login.heading = fc(good) + " " + fc(time);
    });

    this.sra(this.footContainer, this.login);
  }
  protected activationCallback(active: boolean): void {
    if (active) {
      if (!this.login.username) this.login.focusUsername();
      else this.login.focusPassword();

      if (this.foot) this.foot.start();
      else this.preLoadStatus = "start";
    }
    else {
      if (this.foot) this.foot.stop();
      else this.preLoadStatus = "stop";
    }
  }
  stl() {
    return super.stl() + require('./loginPage.css').toString();
  }
}

window.customElements.define('c-login-page', loginPage);
