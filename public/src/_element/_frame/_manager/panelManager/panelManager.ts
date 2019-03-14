import Manager from "./../manager";
import Panel from "./../../_panel/panel"
import {getAllDayNames} from "./../../../../lib/unit/unit";
import lazyLoad, { ImportanceMap, Import } from "./../../../../lib/lazyLoad/lazyLoad";
import {setLang} from "./../../../../lib/language/language";

export default class PanelManager extends Manager {
  protected currentFrame: Panel;
  private _currentPanelName: "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback";

  private map: Map<string, Promise<any>>;

  private rdy: Promise<any>;
  constructor(panel: "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback", public blurCallback?: Function) {
    super();

    let cb = (e) => {if (this.blurCallback !== undefined) this.blurCallback(e)};

    const impMap = new ImportanceMap<() => Promise<any>>(
      {key: new Import<string>("overview", 1, (Overview) => {
        return new Overview(cb);
      }), val: () => import("./../../_panel/overviewPanel/overviewPanel")},
      {key: new Import<string>("language", 3, (LangPanel) => {
        return new LangPanel(
          {cb: () => {setLang("german")}, path: "url(./assets/aut.svg)"},
          {cb: () => {setLang("english")}, path: "url(./assets/uk.svg)"},
          cb
        );
      }), val: () => import("./../../_panel/biOptionPanel/biOptionPanel")},

      {key: new Import<string>("theme", 3, (LangPanel) => {
        return new LangPanel(
          {cb: () => {console.log("left button pressed")}, path: "url(./assets/moon.svg)"},
          {cb: () => {console.log("right button pressed")}, path: "url(./assets/sun.svg)"},
          cb
        );
      }), val: () => import("./../../_panel/biOptionPanel/biOptionPanel")},

      {key: new Import<string>("feedback", 3, (LogoutPanel) => {
        return new LogoutPanel();
      }), val: () => import("./../../_panel/_windowPanel/feedbackPanel/feedbackPanel")},


      {key: new Import<string>("sign_out", 3, (LogoutPanel) => {
        return new LogoutPanel();
      }), val: () => import("./../../_panel/_windowPanel/feedbackPanel/feedbackPanel")},
    );

    let resRdy: Function;
    this.rdy = new Promise((res) => {
      resRdy = res;
    });

    (async () => {
      await getAllDayNames(async (...dayNames: string[]) => {
        await dayNames.ea(async (day) => {
          impMap.set(new Import<string>(day, 2, (dayInsightPanel) => {
            return new dayInsightPanel(day, cb);
          }), () => import("./../../_panel/dayInsightPanel/dayInsightPanel"));
        });
      });

      this.map = lazyLoad(impMap)((panel) => {
        this.body.apd(panel);
      });
      await this.setPanel(panel);
      resRdy();
    })();

  }
  public async setPanel(to: "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback") {
    this._currentPanelName = to;
    this.swapFrame(await this.map.get(to));
  }
  public getPanel(): "overview" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "langauge" | "theme" | "sign_out" | "feedback" {
    return this._currentPanelName;
  }
  protected async activationCallback(active: boolean) {
    await this.rdy;
    this.currentFrame.vate(active)
  }
  stl() {
    return super.stl() + require('./panelManager.css').toString();
  }

}

window.customElements.define('c-panel-manager', PanelManager);
