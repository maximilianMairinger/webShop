import Element from "./../element";

export default abstract class Frame extends Element {
  protected active: boolean = false;
    constructor() {
      super();
    }
    stl() {
      return require('./frame.css').toString();
    }
    public activate(): void {
      this.vate(true)
    }
    public deactivate(): void {
      this.vate(false)
    }
    public vate(activate: boolean) {
      this.active = activate;
      this.activationCallback(activate);
    }
    protected abstract activationCallback(active: boolean):void;
}
