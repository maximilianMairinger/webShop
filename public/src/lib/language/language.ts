// import initData, {DataBase} from "./../dataBase/dataBase";
// import delay from "../delay/delay";
//
// //First capital
// export function fc(s: string): string {
//   return s.charAt(0).toUpperCase() + s.slice(1);
// }
//
// //All capital
// export function ac(s: string): string {
//   return s.toUpperCase();
// }
//
// //(after) space capital
// export function sc(s: string): string {
//   let e = "";
//   let i = s.indexOf(" ");
//   while (i !== -1) {
//     e += s.substring(0, i+1) + s.charAt(i+1).toUpperCase();
//     s = s.substring(i+2);
// 	   i = s.indexOf(" ");
//   }
//   return fc(e + s.substring(i+1));
// }
//
// let initalLangName: "german" | "english" = localStorage.language || "german";
//
// const fetchLang = initData({});
//
//
// let LANGUAGE: DataBase<any>;
//
// setLang(initalLangName)
//
// export function setLang(to: "german" | "english") {
//   localStorage.language = to;
//   LANGUAGE = fetchLang(["backend/lang/" + to + ".json"], "language_" + to);
// }
//
// export default async function(key: string[] | string | number | number, cb: Function, aproxLength?: number) {
//   let s = "";
//   for (let i = 0; i < aproxLength; i++) {
//     s += " ";
//   }
//
//   let args = [];
//   for (let i = 0; i < cb.length; i++) {
//     args.add(s);
//   }
//   cb(...args);
//   //await delay(1000);
//   LANGUAGE.get(key, cb);
// };
//
//
// //@ts-ignore
// global.lang = setLang;
