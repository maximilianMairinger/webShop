export default function init(resources: ImportanceMap<() => Promise<any>>) {
  const resolvements = new Map<string, Function>();
  return function load(globalInitFunc?: (instance: any) => void, initalKey?: string): Map<string, Promise<any>>{
    if (initalKey !== undefined) resources.getByString(initalKey).key.importance = -Infinity;

    let map = new Map<string, Promise<any>>();
    let loaded: Function;
    //@ts-ignore
    map.load = new Promise((res) => {
      loaded = res;
    })
    resources.forEach((e: () => Promise<object>, {val: key}) => {
      map.set(key, new Promise((res) => {
        resolvements.set(key, res);
      }));
    });

    (async () => {
      await resources.forEachOrdered(async (e: () => Promise<any>, key: Import<string>) => {
        let instance = await key.initer((await e()).default);
        if (globalInitFunc !== undefined) globalInitFunc(instance);
        resolvements.get(key.val)(instance);
      });
      loaded();
    })();
    return map;
  }
}

export class ImportanceMap<V> extends Map<Import<string>, V> {
  private importanceList: Import<string>[] = [];
  constructor(...a: {key: Import<string>, val: V}[]) {
    super();
    a.forEach((e) => {
      this.set(e.key, e.val);
    });
  }
  public getByString(key: string): {key: Import<string>, val: V} {
    let kk: any, vv: any;
    this.forEach((v,k) => {
      if (k.val === key) {
        vv = v;
        kk = k;
      }
    });
    if (!kk || !vv) throw "No such value found";
    return {key: kk, val: vv};
  }
  public set(key: Import<string>, val: V): this {
    this.importanceList.add(key);
    super.set(key, val);
    return this;
  }
  public async forEachOrdered(loop: (e?: V, key?: Import<string>, i?: number) => any) {
    this.importanceList.sort((a, b) => {
      return a.importance - b.importance;
    });
    for (let i = 0; i < this.importanceList.length; i++) {
      await loop(this.get(this.importanceList[i]), this.importanceList[i], i);
    }
  }
}

export class Import<T> {
  constructor(public val: T, public importance: number, public initer: (mod: any) => any) {

  }
}
