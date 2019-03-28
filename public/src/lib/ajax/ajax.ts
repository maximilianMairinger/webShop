export async function post(uri: string, {headers: h = {'Content-Type': 'application/json'}, body: b}: PostConf) {
  let o: any = typeof b === "string" ? JSON.parse(b) : b;
  if (o.sessKey !== undefined) console.warn("sessKey in post body is not empty.", o);
  else o.sessKey = localStorage.sessKey || "";
  return await (await fetch(uri, {
    headers: new Headers(h),
    method: "POST",
    body: JSON.stringify(o)
  })).json();
};

interface PostConf {
  headers?: HeadersInit;
  body: object | string;
}

export async function get(uri: string) {
  return await (await fetch(uri)).json();
};
