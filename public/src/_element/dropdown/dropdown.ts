import Button from './../_button/button';
import Element from "./../element";
import Selector from "./../selector/selector";
import SelElem from "./../_button/selectorElement/selectorElement";

export default class Dropdown extends Element {
  private _selector: Selector;
  private button: Button;
  constructor(...selElems: SelElem[]) {
    super();
    this.button = new Button((e) => {
      this._selector.toggle(e);
    });
    this.button.css("background-image", "url(./assets/drop-down-arrow.svg)");

    this._selector = new Selector("bottom","node");

    this.sra(this.button, this._selector);

    this.on("focus", (e) => {
      e.prevFocusActiveOption = true;
    });

    this.elements = selElems;
  }
  public get selector(): Selector {
    return this._selector;
  }
  public set elements(elements: Array<SelElem>) {
    this._selector.elements = elements;
  }
  public get elements(): Array<SelElem> {
    return this._selector.elements;
  }
  stl() {
    return require('./dropdown.css').toString();
  }
}
window.customElements.define('c-dropdown', Dropdown);
