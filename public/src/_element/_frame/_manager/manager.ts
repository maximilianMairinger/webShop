import Frame from "./../frame";

export default abstract class Manager extends Frame {
  protected busySwaping: boolean = false;
  protected abstract currentFrame: Frame;

  protected body: HTMLElement;

  private wantedFrame: Frame;
  constructor() {
    super();
    this.body = dc("manager-body");
    this.sra(this.body);
  }
  /**
   * Swaps to given Frame
   * @param to frame to be swaped to
   */
  protected swapFrame(to: Frame): void {
    this.wantedFrame = to;
    let from = this.currentFrame;
    if (this.busySwaping) return;
    this.busySwaping = true;
    //Focus even when it is already the active frame
    to.focus();
    if (from === to) {
      this.busySwaping = false;
      return;
    }
    to.show();
    to.focus();

    to.activate();
    let showAnim = to.anim({opacity: 1});
    let finalFunction = () => {
      this.busySwaping = false;
      if (this.wantedFrame !== to) this.swapFrame(this.wantedFrame);
    }

    this.currentFrame = to;
    if (from === undefined) {
      showAnim.then(finalFunction);
    }
    else {
      from.deactivate();
      Promise.all([
        from.anim({opacity: 0}).then(() => {
          from.hide();
        }),
        showAnim
      ]).then(finalFunction);

    }
  }
  stl() {
    return require('./manager.css').toString();
  }
}
