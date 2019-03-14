import Window from "./../window";
import {Lesson, selectLesson} from "./../../../lib/unit/unit";
import Bar from "./../../_button/bar/bar";
import lang from "./../../../lib/language/language";
import { DataBase} from "../../../lib/dataBase/dataBase";



export default class BarChart extends Window {
    private contentElem: HTMLElement;
    private axisElem: HTMLElement;

    private _lessons: DataBase<Lesson[]>;

    constructor(lessons?: DataBase<Array<Lesson>>) {
      super();

      this.contentElem = dc("bar-chart-content");
      this.axisElem = dc("bar-chart-axis");

      this.sra(this.contentElem,this.axisElem);

      if (lessons !== undefined) this.lessons = lessons;
    }

    public set lessons(lessons: DataBase<Lesson[]>) {
      if (this.lessons === lessons) return;
      this._lessons = lessons;
      this.contentElem.emptyNodes();
      this.axisElem.emptyNodes();

      lessons.forEach((lesson: DataBase<Lesson>, i) => {
        this.contentElem.append(new Bar(lesson, () => {
          selectLesson(lessons, lesson);
        }));
        let elem = dc("bar-chart-axis-label");
        lesson.get("subject", (subject) => {
          lang("subject." + subject + ".1", (s) => {
            elem.html = s;
          });
        })
        this.axisElem.append(elem);
      });
    }
    public get lessons() {
      return this._lessons;
    }

    stl() {
      return super.stl() + require('./barChart.css').toString();
    }
}

window.customElements.define('c-bar-chart', BarChart);
