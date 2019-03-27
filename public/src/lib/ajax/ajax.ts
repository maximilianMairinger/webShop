export async function post(uri: string, {headers: h = {'Content-Type': 'application/json'}, body: b}: PostConf) {
  return await (await fetch(uri, {
    headers: new Headers(h),
    method: "POST",
    body: typeof b === "object" ? JSON.stringify(b) : b
  })).json();
};

interface PostConf {
  headers?: HeadersInit;
  body: object | string;
}

export async function get(uri: string) {
  return await (await fetch(uri)).json();
};
