import Panel from "./../panel";
import Overview from "./../../../_window/subjectOverviewWindow/subjectOverviewWindow";
import week, {Lesson, Day, Unit, getSelected} from "./../../../../lib/unit/unit";
import {DataBase} from "./../../../../lib/dataBase/dataBase";


let idls = [];
export async function identifyForGrid(db: DataBase<Lesson>) {
  //The i is important for gridlayout (strange bugs otherwise)
  await db.rdy;
  for (let i = 0; i < idls.length; i++) {
    if (idls[i] === db.data) return "i" + i;
  }
  idls.add(db.data);
  return "i" + (idls.length-1);
}

async function getMaxUnitsPerDay() {
  let max = 0;
  await week.forEach(async (d: DataBase<Day>) => {
    if(max < await d.length()) max = await d.length();
  });
  return max;
}
async function getMaxDays() {
  return await week.length();
}

function mkTemp(grid: string[][]): string {
  let end = "";
  grid.forEach((g) => {
    end += '"';
    g.forEach((s) => {
      end += s + " ";
    });
    end += '" ';
  })
  return end;
}

// TODO: Clean up
async function toTemplate(cb: Function) {
  let grid = [];
  let maxLessons = await getMaxUnitsPerDay();

  await week.forEach(async (day: DataBase<Day>, i) => {
    grid[i] = [];
    for (let j = 0; j < maxLessons; j++) {
      let li = Math.floor((j / maxLessons) * await day.length());
      let lessons: DataBase<Lesson[]> = await day.ref(li, "lessons");

      await getSelected(lessons, async (lesson: DataBase<Lesson>) => {
        grid[i][j] = await identifyForGrid(lesson);
        cb(mkTemp(grid));
      });
    }
  });
}
function toFr(num: number): string {
  let s = "";
  for (let i = 0; i < num; i++) {
      s += "1fr "
  }
  return s;
}

export default class OverviewPanel extends Panel {
  private body: HTMLElement;
  constructor(blurCallback?: Function) {
    super(blurCallback);
    this.body = dc("overviewPanel-body");
    this.sra(this.body);

    (async () => {
      await week.rdy;
      this.body.css("opacity", 1);

      this.body.css({gridTemplateColumns: toFr(await getMaxUnitsPerDay()), gridTemplateRows: toFr(await getMaxDays())});

      await week.forEach(async (day: DataBase<Day>) => {
        await day.forEach(async (unit: DataBase<Unit>) => {
          this.body.apd(new Overview(unit, () => {
            this.focus();
          }))
        })
      });

      toTemplate((template: string) => {
        this.body.css("gridTemplateAreas", template);
      })
    })()
  }
  protected activationCallback(active: boolean): void {
    //console.log("overviewPanel is active: " + active)
  }
  stl() {
    return super.stl() + require('./overviewPanel.css').toString();
  }
}
window.customElements.define('c-overview-panel', OverviewPanel);
