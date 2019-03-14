import Element from "./../element";

export default abstract class Window extends Element {
  private _color: string = "gray";
  private _side: Array<"top" | "left" | "right" | "bottom"> = [];
  private _grayed: boolean = false;
  private _borderWidth: number;
  constructor(color?: string, side?: "top" | "left" | "right" | "bottom" | Array<"top" | "left" | "right" | "bottom">, borderWidth: number = 10) {
    super();
    if (color !== undefined) this.color = color;
    if (side !== undefined) this.side = side;
    if (borderWidth !== undefined) this.borderWidth = borderWidth;
  }
  protected set borderWidth(to: number) {
    this._borderWidth = to;
    this.setBorder(this._color);
  }
  protected get borderWidth() {
    return this._borderWidth;
  }
  protected set grayedOut(to: boolean) {
    this._grayed = to;
    if (to) this.setBorder("gray");
    else this.setBorder(this._color);
  }
  protected get grayedOut(): boolean {
    return this._grayed;
  }
  protected set border(to: {color: string, side: "top" | "left" | "right" | "bottom" | Array<"top" | "left" | "right" | "bottom">}) {
    //@ts-ignore
    this._side = [to.side].Flat();
    this._color = to.color;
    this.renderBorder();
  }
  // TODO: Make type colour
  protected set color(to: string) {
    this._color = to;
    this.renderBorder();
  }
  protected set side(to: "top" | "left" | "right" | "bottom" | Array<"top" | "left" | "right" | "bottom">) {
    //@ts-ignore
    this._side = [to].Flat();
    this.renderBorder();
  }
  protected get color(): string {
    return this._color;
  }
  protected get side(): "top" | "left" | "right" | "bottom" | Array<"top" | "left" | "right" | "bottom"> {
    return this._side;
  }
  private renderBorder() {
    if (!this._grayed) this.setBorder(this._color);
  }
  private setBorder(color: string) {
    this._side.forEach(e => {
      this.css("border-" + e, this._borderWidth + "px solid " + color);
    });
  }
  stl() {
    return require('./window.css').toString();
  }
}
