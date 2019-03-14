import initData, {DataBase, Data} from "./../dataBase/dataBase";
import delay from "./../delay/delay";


let WEEKDATA: DataBase<Week>;
const fetchData = initData([]);

setWeek(localStorage.sessKey || "unknwon");
export function setWeek(sessKey: string) {
  localStorage.sessKey = sessKey;
  WEEKDATA = fetchData(["./backend/weekData/set" + sessKey + ".json"], "weekdata_" + sessKey);
}

global.week = WEEKDATA;

export default WEEKDATA;


let unknwonSelected = new Map();
export async function getSelected(lessons: DataBase<Lesson[]>, cb: Function) {
  let fine = false;
  await lessons.forEach(async (lesson: DataBase<Lesson>, i) => {
    await lesson.get("selected", async (isSelected) => {
      if (isSelected) {
        fine = true;
        await cb(await lessons.ref(i))
      }
    });
  });
  if (!fine) {
    //debugger;
    let prev = unknwonSelected.get(lessons.data);
    if (prev !== undefined) await cb(prev);
    else {
      let lesson: DataBase<Lesson> = new DataBase({subject: new Data("subject"), teacher: new Data("..."), color: new Data("black"), note: new Data(""), maxStudents: new Data(0), currentStudents: new Data(0), selected: new Data(false)}, Promise.resolve());
      unknwonSelected.set(lessons.data, lesson);
      await cb(lesson);
    }
  }
}

export async function getAllDayIds(cb: Function) {
  let length = await WEEKDATA.length();
  let params = [];
  for (let i = 0; i < length; i++) {
    WEEKDATA.get(i + ".0.period.begin", async (date: string) => {
      params[i] = new Date(date).getDay() -1;
      if (params.length === length) await cb(...params);
    })
  }
}

const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export function getDayNamePool() {
  return weekDays;
}

export function getDayIdFromNamePool(dayName: "monday"| "tuesday"| "wednesday"| "thursday"| "friday"| "saturday"| "sunday") {
  return weekDays.indexOf(dayName);
}

export async function getDayId(day: DataBase<Unit>, cb: Function) {
  await day.get("0.period.begin", async (date: string) => {
    await cb(new Date(date).getDay()-1);
  })
}

export function getDayElemFromName(dayName: "monday"| "tuesday"| "wednesday"| "thursday"| "friday"| "saturday"| "sunday") {
  return WEEKDATA.ref(weekDays.indexOf(dayName));
}

export async function getDayName(day: DataBase<Unit>, cb: Function) {
  await day.get("0.period.begin", (date: string) => {
    cb(weekDays[new Date(date).getDay()-1]);
  })
}

export async function getDayNamefromPeriod(period: DataBase<Period>, cb: Function) {
  await period.get("begin", (date: string) => {
    cb(weekDays[new Date(date).getDay()-1]);
  })
}

export async function getAllDayNames(cb: Function) {
  let length = await WEEKDATA.length();
  let params = [];
  await WEEKDATA.forEach(async (day: DataBase<Day>, i: number) => {
    await day.get("0.period.begin", async (date: string) => {
      let d = new Date(date);
      params[i] = weekDays[d.getDay()-1];
      if (params.length === length) await cb(...params);
    })
  });
}

export async function selectLesson(lessons: DataBase<Lesson[]>, toLesson: DataBase<Lesson>) {
  let min = false;
  await lessons.forEach((lesson: DataBase<Lesson>) => {
    if (lesson.data === toLesson.data) min = lesson.data.selected.val;
    else if (lesson.data.selected.val) {
      lesson.set("selected", false);
      lesson.set("currentStudents", lesson.data.currentStudents.val-1);
    }
  });
  toLesson.set("selected", true);
  if (!min) toLesson.set("currentStudents", toLesson.data.currentStudents.val+1);

  //return await [server response (if attempt was accepted)]
  await delay(1000);
  return true;
}

export interface Week extends Array<Day> {

}

export interface Day extends Array<Unit> {

}

export interface Unit {
  readonly period: Period;
  readonly lessons: Array<Lesson>;
}

export interface Period {
  readonly begin: Data<string>;
  readonly end: Data<string>;
  readonly name: Data<string>;
}


export interface Lesson {
  readonly subject: Data<string>;
  readonly teacher: Data<string>;
  readonly color: Data<string>;
  readonly note: Data<string>;
  readonly maxStudents: Data<number>;
  readonly currentStudents: Data<number>;
  readonly selected: Data<boolean>;
}
