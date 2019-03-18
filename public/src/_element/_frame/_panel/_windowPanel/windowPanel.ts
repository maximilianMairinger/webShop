import Panel from "./../panel";
import Window from "./../../../_window/window";

export default abstract class WindowPanel extends Panel {
  private container: HTMLElement;
  constructor(blurCallback: Function, window?: Window) {
    super(blurCallback);
    this.container = ce("window-panel-container");
    this.sra(this.container);
    if (window !== undefined) this.window = window;
  }

  protected set window(to: Window) {
    this.container.inner = to;
  }

  protected activationCallback(active: boolean): void {
    //throw new Error("Method not implemented.");
  }

  stl() {
    return super.stl() + require('./windowPanel.css').toString();
  }
}
