import lang, {fc} from "./../../../../lib/language/language";
import Panel from "./../panel";
import Heading from "./../../../_button/switchableHeading/switchableHeading";
import BarChart from "./../../../_window/barChart/barChart";
import {getDayElemFromName} from "./../../../../lib/unit/unit";


// TODO: This is tested in moz and webkit (23/12/18) and is asembled in a very hacky way; One might overhaul this at some point. (css)
export default class DayInsightPanel extends Panel {
  private headContainer: HTMLElement;
  private mainContainer: HTMLElement;
  private barChart: BarChart;

  private nextDay: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

  private _day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  constructor(day?:  "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday", blurCallback?: Function) {
    super(blurCallback);
    this.headContainer = dc("day-insight-panel-head");
    this.mainContainer = dc("day-insight-panel-main");
    this.barChart = new BarChart();


    this.sra(this.headContainer);
    this.mainContainer.append(this.barChart);
    this.sra(this.mainContainer);

    if (day !== undefined) this.day = day;
  }
  public set day(to: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday") {
    this.nextDay = to;

    (async () => {
      if (this.nextDay !== to) return;
      this._day = to;
      let dayElem = await getDayElemFromName(to);
      // The case when there is no such day as this.day (e.g when a class has on monday no lernbüro)
      if (dayElem === undefined) {
        console.warn("No day for \"" + to + "\" found.");
        return;
      }

      let lessons0 = await dayElem.ref("0.lessons");
      this.barChart.lessons = lessons0;


      if (await dayElem.length() > 2) {
        //TODO: Switchable heading and gridlayout of overviewPanel do not support it jet
        throw "Days with more units than 2 are currently not supported";
      }
      else if (await dayElem.length() === 2) {
        let lessons1 = await dayElem.ref("1.lessons");

        let heading = new Heading();

        heading.callback = (left: boolean) => {
          if (left) this.barChart.lessons = lessons0;
          else this.barChart.lessons = lessons1;
        }

        dayElem.get("0.period.name", (name) => {
          lang(name, (s: string) => {
            heading.leftText = fc(s);
          }, 13);
        });
        dayElem.get("1.period.name", (name) => {
          lang(name, (s: string) => {
            heading.rightText = fc(s);
          }, 15);
        });

        new Hammer(this).on("panright", () => {
          this.barChart.lessons = lessons0;
          heading.aligne("left");
        });
        new Hammer(this).on("panleft", () => {
          this.barChart.lessons = lessons1;
          heading.aligne("right");
        });

        this.headContainer.append(heading);
      }
      else if(await dayElem.length() === 1) {
        let elem = dc("day-insight-panel-heading");
        dayElem.get("0.period.name", (name) => {
          lang(name, (s: string) => {
            elem.html = fc(s);
          });
        });

        this.headContainer.apd(elem);
      }
    })();
  }
  public get day(): "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" {
    return this._day;
  }
  protected activationCallback(active: boolean): void {
    this.onResize();
  }
  protected onResize():void {
    if (!this.active) return;
    //                800 + 70 * 2
    if (this.width < (940)) this.mainContainer.css("display", "block");
    else this.mainContainer.css("display", "flex");
  }
  stl() {
    return super.stl() + require('./dayInsightPanel.css').toString();
  }
}

window.customElements.define('c-day-insight-panel', DayInsightPanel);
