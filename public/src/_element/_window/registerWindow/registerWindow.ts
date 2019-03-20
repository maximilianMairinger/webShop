import Window from "./../window";
import Input from "./../../input/input";
import Button from "./../../_button/_rippleButton/blockButton/blockButton";
import Notifier from "../../../lib/notifier/notifier";

export default class RegisterWindow extends Window {
  private headingElem: HTMLElement;
  private usernameInput: Input;
  private passwordInput: Input;
  private emailInput: Input;
  private nameInput: Input;

  private submitButton: Button;
  private changeButton: Button;
  constructor(public submitCallback?: Function, public changePls?: Function) {
    super();
    this.spellcheck = false;

    this.border = {color: "#009EE0", side: "top"};
    this.headingElem = dc("login-window-heading");

    let cb = () => {
      if (!(this.usernameInput.value && this.passwordInput.value && this.emailInput.value && this.nameInput.value)) Notifier.log("Missing Information.");
      else if (this.submitCallback !== undefined) this.submitCallback(this.usernameInput.value, this.passwordInput.value, this.emailInput.value, this.nameInput.value);
    };

    this.usernameInput = new Input("Username", "text", cb);

    this.passwordInput = new Input("Password", "password", cb);

    this.emailInput = new Input("Email", "email", cb);

    this.nameInput = new Input("Full name", "text", cb);


    this.submitButton = new Button("", cb);

    this.changeButton = new Button("", () => {if (this.changePls !== undefined) this.changePls()});
    this.changeButton.addClass("right");

    this.chnageBtnTxt = "Login";

    this.heading = "Register";

    this.sra(this.headingElem, this.usernameInput, this.passwordInput, this.emailInput, this.nameInput, this.submitButton, this.changeButton);

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
    return super.stl() + require('./registerWindow.css').toString();
  }
}

window.customElements.define('c-register-window', RegisterWindow);
