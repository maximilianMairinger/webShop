// TODO: rename file

export default class typedEventListener {
  private f = (e) => {
    this.callback(e);
  }
  private open:boolean = false;
  private p: Nel;
  constructor(node: HTMLElement | Nel, event?:string , callback?: Function, patch:boolean = true) {
    if(node instanceof Nel) this.p = node;
    else {
      this.p = new Nel(node, event, callback);
    }
    if(patch) this.patch();
  }
  public get node():HTMLElement {
    return this.p.node;
  }
  public get event():string {
    return this.p.event;
  }
  public get callback():Function {
    return this.p.callback;
  }
  public set node(node:HTMLElement) {
    this.p.node = node;
    this.reInit();
  }
  public set event(event:string) {
    this.p.event = event;
    this.reInit();
  }
  public set callback(callback:Function) {
    this.p.callback = callback;
    this.reInit();
  }
  public set set(to: Nel) {
    this.p = new Nel(to.node, to.event, to.callback);
  }
  public get get(): Nel {
    return new Nel(this.node, this.event, this.callback);
  }
  private reInit():void {
    if(!this.open) return;
    this.dispatch();
    this.patch();
  }
  public patch():void {
    if(this.open) return;
    this.open = true;
    this.node.addEventListener(this.event,this.f);
  }
  public dispatch():void {
    if(!this.open) return;
    this.open = false;
    this.node.removeEventListener(this.event, this.f);
  }
  public repatch():void {
    this.dispatch();
    this.patch();
  }
}

export class Nel {
  constructor(public node: HTMLElement, public event: string, public callback: Function) {

  }
}
