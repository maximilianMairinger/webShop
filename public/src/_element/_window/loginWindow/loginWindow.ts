import Window from "./../window";
import Input from "./../../input/input";
import Button from "./../../_button/_rippleButton/blockButton/blockButton";

export default class LoginWindow extends Window {
  private headingElem: HTMLElement;
  private usernameInput: Input;
  private passwordInput: Input;
  private submitButton: Button;
  private changeButton: Button;
  constructor(public submitCallback?: Function, heading?: string, public changePls?: Function, chnageBtnTxt?: string, autoFill: boolean = true) {
    super();
    this.spellcheck = false;

    this.border = {color: "#009EE0", side: "top"};
    this.headingElem = dc("login-window-heading");

    let cb = () => {
      if (this.submitCallback !== undefined) this.submitCallback(this.usernameInput.value, this.passwordInput.value);
      localStorage.username = this.usernameInput.value;
    };

    this.usernameInput = new Input("Username", "text", cb);
    if (autoFill) if (localStorage.username !== undefined) this.usernameInput.value = localStorage.username;

    this.passwordInput = new Input("Password", "password", cb);

    this.submitButton = new Button("", cb);

    this.changeButton = new Button("", () => {if (this.changePls !== undefined) this.changePls()});
    this.changeButton.addClass("right");

    this.chnageBtnTxt = chnageBtnTxt;

    if (heading !== undefined) this.heading = heading;

    this.sra(this.headingElem, this.usernameInput, this.passwordInput, this.submitButton, this.changeButton);

    this.on("keydown", (e) => {
      if (e.code === "Escape") this.blur();
    });
  }
  public clear() {
    this.usernameInput.value = "";
    this.passwordInput.value = "";
  }
  public set username(to: string) {
    this.usernameInput.value = to;
  }
  public get username() {
    return this.usernameInput.value;
  }
  public focusUsername() {
    // To instantly set the placeholderstate to up
    this.usernameInput.value = this.usernameInput.value;
    this.usernameInput.focus();
  }
  public focusPassword() {
    // To instantly set the placeholderstate to up
    this.passwordInput.value = this.passwordInput.value;
    this.passwordInput.focus();
  }
  public set heading(to: string) {
    this.headingElem.html = to;
    this.submitButton.text = to;
  }
  public get heading(): string {
    return this.headingElem.html;
  }
  public set chnageBtnTxt(to: string) {
    this.changeButton.text = to;
  }
  public get chnageBtnTxt(): string {
    return this.changeButton.text;
  }
  stl() {
    return super.stl() + require('./loginWindow.css').toString();
  }
}

window.customElements.define('c-login-window', LoginWindow);
