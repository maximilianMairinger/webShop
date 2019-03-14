// TODO: Rename to dataBase

//This contains only pure json data
const dataCache = {};
async function fetchData(cacheId: string, params: any[]): Promise<object> {
  if (dataCache[cacheId] !== undefined) return dataCache[cacheId];
  //@ts-ignore
  let res = await fetch(...params);
  if (res.status !== 200) {
    throw "Unable to load resource: " + res.url;
  }
  let data = await res.json();
  dataCache[cacheId] = data;
  return data;
}

function formatData(fetched: object, formatLocation: object) {
  for (let d in fetched) {
    if (typeof fetched[d] === "object") {
      //Could instanceof object or array (since we are dealing with json)
      if (formatLocation[d] === undefined) formatLocation[d] = new fetched[d].constructor();
      formatData(fetched[d], formatLocation[d]);
    }
    else if(formatLocation[d] === undefined) formatLocation[d] = new Data(fetched[d]);
    else if (formatLocation[d] instanceof Data) formatLocation[d].val = fetched[d];
  }
}

export default function initData(data: object): (fetchParams: any[], chacheId: string, complete?: Function) => DataBase<any> {
  let res: Function;
  let rdy = new Promise((r) => {
    res = r;
  });
  return function(fetchParams: any[], chacheId: string, complete?: Function) {
    fetchData(chacheId, fetchParams).then((fetched) => {
      formatData(fetched, data);
      if (complete !== undefined) complete();
      res();
    });
    return new DataBase(data, rdy);
  }
}

export class DataBase<T> {
  constructor(public readonly data: T, public readonly rdy: Promise<any>) {

  }
  public async length(): Promise<number> {
    await this.rdy;
    if (!(this.data instanceof Array)) throw "Array extepect";
    return this.data.length;
  }
  public async forEach(loop: Function, path: string = ""): Promise<void> {
    if (path !== "" && path.charAt(0) !== ".") path = "." + path;
    for (let i = 0; i < await this.length(); i++) {
      await loop(new DataBase(this.fds(i + path), this.rdy), i);
    }
  }
  public async ref<refT = any>(...keys: Array<string | number>): Promise<DataBase<refT>> {
    await this.rdy;
    return new DataBase(this.fds(...keys), this.rdy);
  }
  public async get(key: string[] | string | number[] | number, cb: Function) {
    await this.rdy;
    if (typeof key === "string" || typeof key === "number") {
      let data = this.fds(key);
      if (data instanceof Data) await data.get(cb);
      //Just for debug purposes
      else console.warn("Unexpected key");
    }
    else {
      let map: any[] = [];
      for (let i = 0; i < key.length; i++) {
        let data = await this.fds(key[i]);
        if (data instanceof Data) data.get(async (v: any) => {
          map[i] = v;
          if (key.length === map.length) await cb(...map);
        });
        //Just for debug purposes
        else console.warn("Unexpected key");
      }
    }
  }
  public async set(key: string | number, to: string | boolean | number) {
    await this.rdy;
    this.fds(key).val = to;
  }
  private fds(...keys: Array<string | number>): Data<any> | any {
    let o = this.data;
    let key = "";
    keys.forEach((k) => {
      key += k.toString() + ".";
    });
    key = key.substring(0, key.length-1);

    let temp = key.split(".");

    temp.forEach((k) => {
      try {
        o = o[k];
      }
      catch(e) {
        throw "Invalid key";
      }
    });
    if (o === undefined) throw "Invalid key"
    //@ts-ignore
    return o;
  }
}



export class Data<T> {
  private _val: T;
  private cbs: Function[] = [];
  constructor(val: T) {
    this.val = val;
  }
  /**
   * Set the val
   */
  public set val(to: T) {
    if (this.val === to) return;
    this.cbs.forEach((f) => {
      f(to);
    });
    this._val = to;
  }
  /**
   * Gets the current val
   */
  public get val(): T {
    return this._val;
  }
  /**
   * To always stay uptodate with the current val
   * @param cb callback which gets called whenever the val changes
   */
  public async get(cb: Function): Promise<void> {
    this.cbs.add(cb);
    await cb(this.val);
  }
  public toString() {
    return this.val;
  }
}
