global.dc = global.ce = (name: string) => {
  return document.createElement(name);
};




let p = HTMLElement.prototype;

let toBeNumbers:string[] = ["opacity", "offset", "grid-area"];
function formatStyle(prop: string, style: string | number) {
  let intok = toBeNumbers.includes(prop);
  if (typeof style === "number") {
    if (!intok) return style + "px";
    return style;
  }
  else if (intok) {
    let parsed = parseFloat(style);
    if (!isNaN(parsed)) return parsed;
    else return style;
  }
  return style;
}

p.css = function(key_css: string | object, val?: string | number): any {
  if (typeof key_css === "object") {
    for(let stl in key_css) {
      this.style[stl] = formatStyle(stl, key_css[stl]);
    }
  }
  else if (val !== undefined) {
    this.style[key_css] = formatStyle(key_css, val);
  }
  else return window.getComputedStyle(this)[key_css];
  return;
};

function defaultFrame(frame: object): object {
  let ret: object = {};
  for(let prop in frame) {
    if (prop !== "offset") {
      let style = this.css(prop);
      if (style === "") style = "unset";
      ret[prop] = style;
    }
  }
  return ret;
}

function formatCss(css: object): object {
  for (let key in css) {
    css[key] = formatStyle(key, css[key]);
  }
  return css;
}


p.anim = function(frame_frames: object | object[], options: WAAPIOptions = {}) {
  let animationQueue: any;
  if (this.animationQueue !== undefined) animationQueue = this.animationQueue;
  else {
    animationQueue = [];
    this.animationQueue = animationQueue;
  }
  return new Promise((res) => {
    if(this.isInAnimation) {
      if (animationQueue.length > 20) return console.warn("animationQueue length at \"" + animationQueue.length + "\". Aborting further extention.");
      animationQueue.add({arguments, res});
      return;
    };
    this.isInAnimation = true;

    if (options.duration === undefined) options.duration = 100;
    if (options.iterations === undefined) options.iterations = 1;
    if (options.easing === undefined) options.easing = "linear";
    let fill = options.fill;
    if (fill === undefined) fill = true;
    //@ts-ignore
    options.fill = "none";

    let endFrames: object[];

    if (frame_frames instanceof Array) {
      let frames: object[] = frame_frames;
      frames.forEach((frame) => {
        formatCss(frame);
      });
      //@ts-ignore
      if(frames[0].offset !== undefined && frames[0].offset !== 0) {
        let initFrame = defaultFrame.call(this, frames[0]);
        frames.dda(initFrame);
      }
      endFrames = frames;
    }
    else {
      let frame: object = frame_frames;
      formatCss(frame);
      let initFrame = formatCss(defaultFrame.call(this, frame));
      endFrames = [initFrame, frame];
    }

    //Async
    this.animate(endFrames, options).onfinish = () => {
      if (fill) this.css(endFrames.last);
      this.isInAnimation = false;
      if (!this.animationQueue.empty) {
        let toAnimate = animationQueue.first;
        this.animationQueue.remove(0);
        this.anim(...toAnimate.arguments).then(() => {
          toAnimate.res();
        });
      }
      res();
    };
  });
}

p.on = p.addEventListener;
p.off = p.removeEventListener;

Object.defineProperty(p, "html", {
get() {
  return this.innerHTML;
},
set(to: string) {
  this.innerHTML = to;
}});
Object.defineProperty(p, "inner", {
set(to: string | HTMLElement) {
  if (to instanceof HTMLElement) {
    this.innerHTML = "";
    this.append(to);
  }
  else this.innerHTML = to;
}});

p.addClass = function(...className: string[]) {
  this.classList.add(...className);
  return this;
}

p.removeClass = function(...className: string[]) {
  this.classList.remove(...className);
  return this;
}

p.hasClass = function(...className: string[]) {
  let has = true;
  className.forEach((cls) => {
    if (!this.classList.contains(cls)) has = false;
  });
  return has
}

p.toggleClass = function(...className: string[]) {
  className.forEach((cls) => {
    if (this.hasClass(cls)) this.removeClass(cls);
    else this.addClass(cls);
  });
  return this
}

p.apd = function(...elems: Array<HTMLElement | string>) {
  elems.forEach((e) => {
    if (e instanceof HTMLElement) this.append(e);
    else this.innerHTML += e;
  });
  return this;
}

p.emptyNodes = function() {
  this.html = "";
  return this;
}

p.hide = function() {
  this.css("display", "none");
  return this;
}

p.show = function() {
  this.css("display", "block");
  return this;
}

p.childs = function(selector: string = "*") {
  return new NodeLs<HTMLElement>(...this.querySelectorAll(selector));
}

Object.defineProperty(p, "height", {get() {
  return parseFloat(this.css("height"));
}});

Object.defineProperty(p, "width", {get() {
  return parseFloat(this.css("width"));
}});

Object.defineProperty(p, "offset", {get() {
  return this.getBoundingClientRect();
}});

Object.defineProperty(p, "outerWidth", {get() {
  return parseFloat(this.offsetWidth);
}});

Object.defineProperty(p, "outerHeight", {get() {
  return parseFloat(this.offsetHeight);
}});

Object.defineProperty(p, "innerWidth", {get() {
  return parseFloat(this.clientWidth);
}});

Object.defineProperty(p, "innerHeight", {get() {
  return parseFloat(this.clientHeight);
}});

Object.defineProperty(p, "parent", {get() {
  return this.parentElement;
}});


export class NodeLs<T extends HTMLElement = HTMLElement> extends Array<T> implements GenericNodeLs {
  constructor(...a: Array<T>) {
    super(...a);
  }
  async anim(frame: object, options?: WAAPIOptions, oneAfterTheOther: boolean = false): Promise<void> {
    if (oneAfterTheOther) {
      for(let e of this) {
        await e.anim(frame, options);
      }
      return;
    }
    if (this[0]) await this[0].anim(frame, options);
    for(let i = 1; i < this.length; i++) {
      this[i].anim(frame, options);
    }
  }
  on(event: string, callback: Function): this {
    this.exec("on", arguments);
    return this;
  }
  show(): this {
    this.exec("show", arguments);
    return this;
  }
  removeClass(className: string): this {
    this.exec("removeClass", arguments);
    return this;
  }
  apd(...elems: HTMLElement[]): this {
    this.exec("apd", arguments);
    return this;
  }
  emptyNodes(): this {
    this.exec("empty", arguments);
    return this;
  }
  hide(): this {
    this.exec("hide", arguments);
    return this;
  }
  css(key_css: string | object, val?: string): this {
    this.exec("css", arguments);
    return this;
  }
  childs(selector: string = "*"): NodeLs<HTMLElement> {
    let ls = new NodeLs();
    this.forEach((e) => {
      ls.add(...e.childs(selector));
    });
    return ls;
  }
  addClass(...classNames: string[]): this {
    this.exec("addClass", arguments);
    return this;
  }
  hasClass(...classNames: string[]): boolean {
    let has = true;
    this.forEach((e) => {
      if (!e.hasClass(...classNames)) has = false;
    });
    return has
  }
  toggleClass(...classNames: string[]): this {
    this.exec("toggleClass", arguments);
    return this
  }
  off(): this {
    this.exec("off", arguments);
    return this;
  }

  set html(to: string) {
    this.forEach((e) => {
      e.html = to;
    });
  }
  get html(): string {
    let s = "";
    this.forEach((e) => {
      s += e.html;
    })
    return s;
  }
  set inner(to: string | HTMLElement) {
    this.forEach((e) => {
      e.inner = to;
    });
  }


  private exec(name: string, args: IArguments): void {
    this.forEach((e) => {
      e[name](...args);
    });
  }
}
