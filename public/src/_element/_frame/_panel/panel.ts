import Frame from "./../frame";

export default abstract class Panel extends Frame {
    constructor(public blurCallback?: Function) {
      super();
      this.tabIndex = -1;
      this.on("keydown", (e) => {
        if (e.code === "Escape") {
          this.blur();
          if (this.blurCallback !== undefined) this.blurCallback(e);
        }
      });
    }
    stl() {
      return super.stl() + require('./panel.css').toString();
    }
}
