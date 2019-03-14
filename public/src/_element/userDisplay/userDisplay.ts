import Element from './../element';
import Avatar from "./../avatar/avatar"
import UserOptions from "./../userOptions/userOptions"

export default class UserDisplay extends Element {
  private avatar: Avatar;
  private option: UserOptions;
  constructor(public openPanel?: (panel: "theme" | "langauge" | "feedback" | "sign_out") => void) {
    super();
    this.avatar = new Avatar();
    this.option = new UserOptions((panel: "theme" | "langauge" | "feedback" | "sign_out") => {
      if (this.openPanel !== undefined) this.openPanel(panel);
    });
    let div = dc("div");
    div.apd(this.option)
    this.sra(this.avatar, div);
  }
  stl() {
    return require('./userDisplay.css').toString();
  }
}
window.customElements.define('c-user-display', UserDisplay);
