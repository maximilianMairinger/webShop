import Window from "./../window";
import Input from "./../../input/input";
import Button from "./../../_button/_rippleButton/blockButton/blockButton";
import lang, {fc , sc} from "./../../../lib/language/language";

export default class LoginWindow extends Window {
  private headingElem: HTMLElement;
  private usernameInput: Input;
  private passwordInput: Input;
  private submitButton: Button;
  constructor(public submitCallback?: Function, heading?: string) {
    super();
    this.spellcheck = false;

    this.border = {color: "#009EE0", side: "top"};
    this.headingElem = dc("login-window-heading");
    if (heading !== undefined) this.heading = heading;

    let cb = () => {
      if (this.submitCallback !== undefined) this.submitCallback(this.usernameInput.value, this.passwordInput.value);
      localStorage.username = this.usernameInput.value;
    };

    this.usernameInput = new Input(undefined, "text", cb);
    if (localStorage.username !== undefined) this.usernameInput.value = localStorage.username;
    lang("username", (s) => {
      this.usernameInput.placeholderText = fc(s);
    });

    this.passwordInput = new Input(undefined, "password", cb);
    lang("password", (s) => {
      this.passwordInput.placeholderText = fc(s);
    });

    this.submitButton = new Button("", cb);
    lang("login", (login) => {
      this.submitButton.text = sc(login);
    })

    this.sra(this.headingElem, this.usernameInput, this.passwordInput, this.submitButton);

    this.on("keydown", (e) => {
      if (e.code === "Escape") this.blur();
    });
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
  }
  public get heading(): string {
    return this.headingElem.html;
  }
  stl() {
    return super.stl() + require('./loginWindow.css').toString();
  }
}

window.customElements.define('c-login-window', LoginWindow);
