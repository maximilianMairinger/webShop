import Element from './../element';

export default class Avatar extends Element {
  private imgElem: HTMLImageElement;
  constructor() {
      super(false, false);
      this.imgElem = dc("img");
      this.image = "assets/default-avatar.png";
      this.sra(this.imgElem);
  }
  set image(image:string) {
    this.imgElem.src = image;
    this.imgElem.on("load", () => {
      this.imgElem.anim({opacity: 1}, {duration: 300});
    });
  }
  get image():string {
    return this.imgElem.src;
  }
  stl() {
    return require('./avatar.css').toString();
  }
}
window.customElements.define('c-avatar', Avatar);


//"https://picsum.photos/2000/2000";
//"src/Element/avatar/default-avatar.png";
