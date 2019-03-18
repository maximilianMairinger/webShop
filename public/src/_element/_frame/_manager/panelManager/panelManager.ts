import Manager from "./../manager";
import Panel from "./../../_panel/panel"
import lazyLoad, { ImportanceMap, Import } from "./../../../../lib/lazyLoad/lazyLoad";

export default class PanelManager extends Manager {
  protected currentFrame: Panel;
  private _currentPanelName: string;

  private map: Map<string, Promise<any>>;
  constructor(panel: string, public blurCallback?: Function) {
    super();

    let cb = (e) => {if (this.blurCallback !== undefined) this.blurCallback(e)};

    const impMap = new ImportanceMap<() => Promise<any>>(
      {key: new Import<string>("newArticle", 1, (Overview) => {
        return new Overview();
      }), val: () => import("./../../_panel/_windowPanel/newArticlePanel/newArticlePanel")},
    );



    this.map = lazyLoad(impMap)((panel) => {
      this.body.apd(panel);
    });


    this.setPanel(panel);

  }
  public async setPanel(to: string) {
    this._currentPanelName = to;
    console.log(to)
    this.swapFrame(await this.map.get(to));
  }
  public getPanel(): string {
    return this._currentPanelName;
  }
  protected async activationCallback(active: boolean) {
    this.currentFrame.vate(active)
  }
  stl() {
    return super.stl() + require('./panelManager.css').toString();
  }

}

window.customElements.define('c-panel-manager', PanelManager);
