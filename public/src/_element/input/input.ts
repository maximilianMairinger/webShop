import Element from "./../element";

export default class Input extends Element {
  private placeholder: HTMLElement;
  private input: HTMLInputElement;
  private isUp: boolean = false;
  private isFocused: boolean = false;
  constructor(placeholder: string = "", type: "password" | "text" = "text", public submitCallback?: Function, value?: any) {
    super();

    this.placeholder = dc("input-placeholder");
    this.placeholderText = placeholder;
    this.placeholder.on("click", () => {
      this.input.focus();
    });

    this.input = dc("input");
    this.type = type;

    this.input.on("focus", () => {
      this.placeHolderUp();
    });
    this.input.on("blur", () => {
      if (this.value === "") this.placeHolderDown();
    });
    let alreadyPressed = false;
    this.input.on("keydown", ({key}) => {
      if (key === "Enter" && this.submitCallback !== undefined) if (!alreadyPressed){
        alreadyPressed = true;
        this.submitCallback(this.value);
      }
    });
    this.input.on("keyup", ({key}) => {
      if (key === "Enter") {
        alreadyPressed = false;
      }
    });

    this.on("focus", () => {
      this.isFocused = true;
    });
    this.on("blur", () => {
      this.isFocused = false;
    });


    this.sra(this.placeholder, this.input);

    if (value !== undefined) this.value = value;
  }
  public set placeholderText(to: string) {
    this.placeholder.html = to;
  }
  public get placeholderText(): string {
    return this.placeholder.html;
  }
  public set type(to: "password" | "text") {
    this.input.type = to;
  }
  public get type(): "password" | "text" {
    //@ts-ignore
    return this.input.type;
  }
  public focus() {
    this.input.focus();
  }
  public get value(): any {
    return this.input.value;
  }
  public set value(to: any) {
    this.input.value = to;
    this.alignPlaceHolder();
  }
  private alignPlaceHolder() {
    if (this.value === "" && !this.isFocused) this.placeHolderDown("css");
    else this.placeHolderUp("css");
  }
  private placeHolderUp(func: "anim" | "css" = "anim") {
    if (!this.isUp) {
      this.placeholder[func]({marginTop: "-1.2em", marginLeft: 0, fontSize: ".8em"});
      this.isUp = true;
    }
  }
  private placeHolderDown(func: "anim" | "css" = "anim") {
    if (this.isUp) {
      this.placeholder[func]({marginLeft: "13px", marginTop: "10px", fontSize: "1em"});
      this.isUp = false;
    }
  }
  stl() {
    return require('./input.css').toString();
  }
}

window.customElements.define('c-input', Input);
