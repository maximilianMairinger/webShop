window.onresize = (event) => {
  Element.resize.forEach((e) => {
    e(event);
  });
}

export default abstract class Element extends HTMLElement {
  public static resize: Function[] = [];

  protected sr: ShadowRoot;
  constructor(draggable: boolean = true, selectable: boolean = true) {
    super();
    this.sr = this.attachShadow({mode: "open"});

    if (!draggable) this.on("dragstart", e => e.preventDefault);

    let tempCss = require('./element.css').toString();
    if (!selectable) tempCss += "*{-moz-user-select: none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}"
    let generalCss = "<!--General styles--><style>" + tempCss + "</style>";

    let mainCss = "";
    //@ts-ignore
    if (this.stl !== undefined) mainCss += "<!--Main styles-->\n<style>" + this.stl() + "</style>";

    this.sr.innerHTML = generalCss + mainCss;

    //@ts-ignore
    if (this.onResize !== undefined) Element.resize.push((e) => {this.onResize(e)});
  }
  /**
   * Appends to ShadowRoot
   */
  public sra(...elems: HTMLElement[]): void {
    elems.forEach((e) => {
      this.sr.append(e);
    });
  }
}

/*
import Element from "./../element";

export default class Example extends Element {
  constructor() {
    super();

  }
  stl() {
    return require('./example.css').toString();
  }
}

window.customElements.define('c-example', Example);

*/
