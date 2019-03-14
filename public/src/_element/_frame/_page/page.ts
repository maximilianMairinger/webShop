import Frame from "./../frame";

export default abstract class Page extends Frame {
    constructor() {
      super();
    }
    stl() {
      return super.stl() + require('./page.css').toString();
    }
}
