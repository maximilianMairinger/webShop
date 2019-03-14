import lang, {fc, sc} from "./../../../lib/language/language";
import Window from "./../window";
import Editable from "./../../editable/editable";
import Selector from "./../../selector/selector";
import SelElem from "./../../_button/selectorElement/selectorElement";
import {DataBase} from "./../../../lib/dataBase/dataBase";
import week, {Lesson, Day, Unit, getSelected, getDayNamefromPeriod, Period, selectLesson} from "./../../../lib/unit/unit";
import { identifyForGrid } from "../../_frame/_panel/overviewPanel/overviewPanel";
import * as Hammer from "hammerjs";

function combineTwoStringsToOne(s: string[]) {
  return fc(s[0]) + " " + fc(s[1]);
}


export default class SubjectOverviewWindow extends Window {
  private subjectElem: HTMLElement;
  private noteElem: Editable;
  private titleElem: HTMLElement;

  private sel: Selector;
  constructor(unit: DataBase<Unit>, public onSubmit?: Function) {
    super(undefined, "left");

    this.titleElem = dc("chart-title");

    this.subjectElem = dc("chart-subject");

    this.noteElem = new Editable("", this.onSubmit);

    this.sel = new Selector("right", "mouse");
    let selectorElements: SelElem[] = [];
    (async () => {
      let lessons = await unit.ref("lessons");
      await lessons.forEach((lesson: DataBase<Lesson>, i) => {
        selectorElements[i] = new SelElem("...", async () => {
          this.grayedOut = true;
          await selectLesson(lessons, lesson);
          this.grayedOut = false;
        });
        lang("subject." + lesson.data.subject.val + ".0", (subject: string) => {
          selectorElements[i].text = sc(subject);
        }, 20);
      });
      this.sel.elements = selectorElements;
    })();

    new Hammer(this).on("press", ({srcEvent: e}) => {
      this.sel.open(e, this);
      this.sel.dontCloseOnBlur = true;
    });

    let closeF = ({srcEvent: e}) => {
      this.sel.dontCloseOnBlur = false;
      this.sel.focus();
    };


    new Hammer(this).on("pan", closeF);

    new Hammer(this).on("pressup", closeF);

    this.sra(this.titleElem, this.subjectElem, this.noteElem, this.sel);



    (async () => {
      await getSelected(await unit.ref("lessons"), async (ue: DataBase<Lesson>) => {
        ue.get("color", (color) => {
          this.color = color;
        });

        this.css("grid-area", await identifyForGrid(ue));

        let period = await unit.ref<Period>("period");
        let dayAndName = [];
        getDayNamefromPeriod(period, (weekDay) => {
          lang(weekDay, (day) => {
            dayAndName[0] = day;
            if (dayAndName.length === 2) this.titleElem.html = combineTwoStringsToOne(dayAndName);
          }, 20)
        })
        period.get("name", (name) => {
          lang(name, (n) => {
            dayAndName[1] = n;
            if (dayAndName.length === 2) this.titleElem.html = combineTwoStringsToOne(dayAndName);
          }, 1)
        });


        ue.get("subject", (subject) => {
          if (subject === -1) {
            this.subjectElem.html = fc("idk");
            return;
          }
          lang("subject." + subject + ".0", (s) => {
             this.subjectElem.html = fc(s);
          }, 1);
        })

        ue.get("note", (note) => {
          this.noteElem.value = note;
        });
      })

      this.on("contextmenu", (e) => {
        e.preventDefault();
      });
      this.on("mousedown", (e) => {
        if (e.which === 3) {
          this.sel.open(e)
          //When not prevennting default focus gets all messed up.
          e.preventDefault();
        };
      });
    })();
  }
  // TODO: Make type colour
  public set color(to: string) {
    super.color = to;
  }
  public set note(to: string) {
    this.noteElem.value = to;
  }
  public get note():string {
    return this.noteElem.value;
  }
  stl() {
    return super.stl() + require('./subjectOverviewWindow.css').toString();
  }
}
window.customElements.define('c-subject-overview', SubjectOverviewWindow);
