import lang, {fc} from "./../../lib/language/language";
import Element from './../element';
import Dropdown from "./../dropdown/dropdown";
import SelectorElement from "./../_button/selectorElement/selectorElement";

export default class UserOptions extends Element {
  private dropdown: Dropdown;
  private span: HTMLSpanElement;
    constructor(public openPanel?: (panel: "theme" | "langauge" | "feedback" | "sign_out") => void) {
        super();

        this.span = dc("span");
        lang("username", (s) => {
          this.span.html = fc(s);
        }, 17);
        this.sra(this.span);

        this.dropdown = new Dropdown(
          new SelectorElement(""),
          new SelectorElement(""),
          new SelectorElement(""),
          new SelectorElement("")
        );

        let ls = ["theme", "language", "feedback", "sign_out"];
        this.dropdown.elements.forEach((e,i) => {
          //@ts-ignore
          e.addActivationCallback(() => {if (this.openPanel !== undefined) openPanel(ls[i])});
          lang(ls[i], (s) => {
            e.text = fc(s);
          }, 1);
        });
        this.sra(this.dropdown);
    }
    stl() {
      return require('./userOptions.css').toString();
    }
}
window.customElements.define('c-user-options', UserOptions);
