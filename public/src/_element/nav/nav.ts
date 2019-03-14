import lang, {fc} from "./../../lib/language/language";
import Element from "./../element";
import userDisplay from "./../userDisplay/userDisplay";
import pageOptions from "./../pageOption/pageOption";
import PageOptionsElement from "./../_button/_rippleButton/pageOptionElement/pageOptionElement";
import {getAllDayNames} from "./../../lib/unit/unit";

export default class Nav extends Element {
  private options: pageOptions;
  private user: userDisplay;

  private rdy: Promise<any>;
  constructor(public openPanel?: (panel: "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback") => void) {
    super();
    this.tabIndex = 0;

    let switchPanelFunc = (panelName: "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback") => {if(this.openPanel !== undefined) this.openPanel(panelName);};

    this.user = new userDisplay((panel: "theme" | "langauge" | "feedback" | "sign_out") => {
      switchPanelFunc(panel);
    });

    this.options = new pageOptions();

    let overviewOption = new PageOptionsElement("overview");
    overviewOption.addActivationCallback(() => {switchPanelFunc("overview")});
    lang("overview", (s) => {
      overviewOption.text = fc(s);
    }, 20);
    this.rdy = new Promise(async (res) => {
      await getAllDayNames((...dayNames: any[]) => {
        let poe = [];
        dayNames.forEach((dayName) => {
          let p = new PageOptionsElement(dayName);
          p.addActivationCallback(() => {switchPanelFunc(dayName)});
          lang(dayName, (s) => {
            p.text = fc(s);
          }, 20);
          poe.add(p);
        });
        poe.dda(overviewOption);
        this.options.elements = poe;
      });
      res();
    });




    this.sra(this.user, this.options);

    this.openPanel = openPanel;

    this.on("focus", async (e) => {
      await this.rdy;
      if (!e.prevFocusActiveOption) {
        let active = this.options.isActive;
        //Under some circumstances (like when logoutPanel is open) there can be no active option.
        if (active) active.focus();
      }
    });
  }
  public async activateOption(panel: string) {
    await this.rdy;
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
