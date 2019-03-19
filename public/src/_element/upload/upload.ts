import Element from "./../element";

export default class Upload extends Element {
  private input: HTMLInputElement;
  private display: HTMLElement;
  constructor(accept?: string) {
    super();
    this.input = ce("input");
    this.input.type = "file";
    this.input.on("mouseover", () => {
      this.display.addClass("hov");
    });
    this.input.on("mouseout", () => {
      this.display.removeClass("hov");
    });
    this.input.on("dragenter", () => {
      this.display.addClass("drg");
    });
    this.input.on("dragleave", () => {
      this.display.removeClass("drg");
    });
    this.input.on("focus", () => {
      this.display.addClass("foc");
    });
    this.input.on("blur", () => {
      this.display.removeClass("foc");
    });

    this.accept = accept;


    this.display = ce("upload-display");
    let img = ce("img");
    img.src = "./assets/drop.svg";
    this.display.apd(img);


    this.sra(this.display, this.input);
  }

  public set accept(to: string) {
    this.input.accept = to;
  }
  public get accept(): string {
    return this.input.accept;
  }

  stl() {
    return require('./upload.css').toString();
  }
}
window.customElements.define('c-upload', Upload);
