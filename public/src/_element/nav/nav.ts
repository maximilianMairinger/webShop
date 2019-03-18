import Element from "./../element";
import pageOptions from "./../pageOption/pageOption";
import PageOptionsElement from "./../_button/_rippleButton/pageOptionElement/pageOptionElement";

export default class Nav extends Element {
  private options: pageOptions;

  constructor(public openPanel?: (panel: string) => void) {
    super();
    this.tabIndex = 0;

    let switchPanelFunc = (panelName: string) => {if(this.openPanel !== undefined) this.openPanel(panelName);};

    this.options = new pageOptions();

    this.options.elements = [new PageOptionsElement("Neuer Artikel", () => {switchPanelFunc("newArticle")})]


    this.sra(this.options);

    this.openPanel = openPanel;

    this.on("focus", async (e) => {
      if (!e.prevFocusActiveOption) {
        let active = this.options.isActive;
        //Under some circumstances (like when logoutPanel is open) there can be no active option.
        if (active) active.focus();
      }
    });
  }
  public activateOption(panel: string) {
    this.options.activate(panel);
  }
  stl() {
    return require('./nav.css').toString();
  }
  onResize() {
    // TODO: make scrollbar not recenter userDisplay
    if(this.offsetHeight < 630) {
      this.options.css("top", 200);
    } else {
      this.options.css("top", "");
    }
  }
}

window.customElements.define('c-nav', Nav);
