export default async function(uri: string, {headers: h = {'Content-Type': 'application/json'}, body: b}: Conf) {
  return await (await fetch(uri, {
    headers: new Headers(h),
    method: "POST",
    body: typeof b === "object" ? JSON.stringify(b) : b
  })).json();
}


interface Conf {
  headers?: HeadersInit;
  body: object | string;
}
