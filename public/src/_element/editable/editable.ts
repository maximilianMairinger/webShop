import Element from "./../element";

export default class Editable extends Element {
  private elem: HTMLTextAreaElement;
    constructor(value: string = "", public onSubmit?: Function) {
      super();
      this.elem = dc("textarea");
      this.elem.on("focus", (e) => {
        e.target.select();
      });
      this.elem.on("keydown", (e) => {
        e.prev = true;
        if (e.code === "Enter" && e.ctrlKey) {
          let cursorPos: number = this.elem.selectionStart;
          let v:string = this.elem.value;
          let textBefore = v.substring(0, cursorPos);
          let textAfter  = v.substring(cursorPos, v.length );
          this.elem.value = textBefore +  "\n" + textAfter;
          cursorPos++;
          this.elem.selectionStart = cursorPos;
          this.elem.selectionEnd = cursorPos;
        }
        else if (e.code === "Enter" || e.code === "Escape"){
          this.elem.blur();
          if (this.onSubmit !== undefined) this.onSubmit();
        }
      });

      this.sra(this.elem);

      this.value = value;
    }
    public set value(to: string) {
      this.elem.value = to;
    }
    public get value(): string {
      return this.elem.value;
    }
    stl() {
      return require('./editable.css').toString();
    }
}

window.customElements.define('c-editable', Editable);
