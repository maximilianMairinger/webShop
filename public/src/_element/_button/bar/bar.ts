import Button from "./../button";
import Selector from "./../../selector/selector";
import SelectorElement from "./../selectorElement/selectorElement";
import { DataBase } from "../../../lib/dataBase/dataBase";
import { Lesson, selectLesson} from "../../../lib/unit/unit";

export default class Bar extends Button {
    private valueElem: HTMLElement;
    private containerElem: HTMLElement;
    private students: number;
    private maxStudents: number;
    private sel: Selector;

    private studentCountDisplay: SelectorElement;
    private teacherDisplay: SelectorElement;
    constructor(lesson: DataBase<Lesson>, public addStudentCallback?: Function) {
      super((e) => {
        if (this.addStudentCallback !== undefined) addStudentCallback();
      });
      this.preventFocus = true;

      this.containerElem = dc("bar-container");
      this.valueElem = dc("bar-value");

      this.studentCountDisplay = new SelectorElement("?");
      this.teacherDisplay = new SelectorElement("?");
      this.sel = new Selector("top","node",false);
      this.sel.elements = [
        this.teacherDisplay,
        this.studentCountDisplay
      ]

      this.containerElem.append(this.valueElem);
      this.sra(this.containerElem, this.sel);

      lesson.get("teacher", (teacher) => {
        this.teacherDisplay.text = teacher;
      })
      lesson.get("color", (color) => {
        this.valueElem.css("background-color", color);
      })
      lesson.get("maxStudents", (maxStudents) => {
        this.maxStudents = maxStudents;
      });

      //Dont animate vertically initialy (fade in instead)
      (async () => {
        await lesson.rdy;
        this.setStudents(lesson.data.currentStudents.val);
        this.valueElem.css({height: (lesson.data.currentStudents.val / this.maxStudents) * 100 + "%"});
        this.valueElem.anim({opacity: 1},{duration: 200});
      })();
      //Otherwise animate vertically
      lesson.get("currentStudents", (currentStudents) => {
        this.studentCount = currentStudents;
      })

      this.on("focus", (e: any) => {
        this.sel.open(e);
      });
      this.on("blur", (e: any) => {
        this.sel.close();
      });

      this.on("contextmenu", (e: any) => {
        e.preventDefault();
      });
      this.on("mousedown", (e: any) => {
        e.preventDefault();
        if (e.which === 3) {
          this.focus();
          //When not prevennting default focus gets all messed up.
          e.preventDefault();
        };
      });
    }

    public get studentCount() {
      return this.students;
    }

    public set studentCount(to: number) {
      if (this.students === to) return;
      this.setStudents(to);
      this.valueElem.anim({height: (to / this.maxStudents) * 100 + "%"},{duration: 200, easing: "cubic-bezier(.6,.31,.42,1.02)"});
    }
    private setStudents(to: number) {
      this.students = to;
      this.studentCountDisplay.text = to + "/" + this.maxStudents;
    }
    stl() {
      return super.stl() + require('./bar.css').toString();
    }
}

window.customElements.define('c-bar', Bar);
