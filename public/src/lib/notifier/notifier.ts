import Notification from "./../../_element/notification/notification";
import NotificationQueue from "./../../_element/notificationQueue/notificationQueue";
import delay from "../delay/delay";

function fc(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default class Notifier {
  public static queue = new NotificationQueue();

  /**
   * @param text displayed message.
   */
  public static log(text: string): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   */
  public static log(title: string, text: string): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   */
  public static log(defaultTitle: boolean, text: string): Notification;
  public static log(title_text_defaultTitle: string | boolean, text?: string): Notification {
    //@ts-ignore
    return this.msg("information", ...arguments)
  }


  /**
   * @param text displayed message.
   */
  public static error(text: string): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   */
  public static error(title: string, text: string): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   */
  public static error(defaultTitle: boolean, text: string): Notification;
  public static error(title_text_defaultTitle: string | boolean, text?: string): Notification {
    //@ts-ignore
    return this.msg("error", ...arguments)
  }


  /**
   * @param text displayed message.
   */
  public static success(text: string): Notification;
  /**
   * @param title displayed title.
   * @param text displayed message.
   */
  public static success(title: string, text: string): Notification;
  /**
   * @param defaultTitle true if the default title should be used.
   * @param text displayed message.
   */
  public static success(defaultTitle: boolean, text: string): Notification;
  public static success(title_text_defaultTitle: string | boolean, text?: string): Notification {
    //@ts-ignore
    return this.msg("success", ...arguments)
  }
  //TODO:
  // public static warn(title_text_defaultTitle: string | boolean, text?: string): void {
  //
  // }

  public static msg(type: "information" | "success" | "error", text: string): Notification;
  public static msg(type: "information" | "success" | "error", title: string, text: string): Notification;
  public static msg(type: "information" | "success" | "error", defaultTitle: boolean, text: string): Notification;
  public static msg(type: "information" | "success" | "error", title_text_defaultTitle: string | boolean, text?: string): Notification {
    let noti: Notification;
    if (text === undefined)
      noti = this.queue.appendNotification(
        //@ts-ignore
        new Notification(title_text_defaultTitle, "", type, (p) => {this.queue.closeNotification(p)}, () => {this.queue.closeAllNotifications()}));
    else if (typeof title_text_defaultTitle === "string")
      noti = this.queue.appendNotification(
        new Notification(title_text_defaultTitle, text, type, (p) => {this.queue.closeNotification(p)}, () => {this.queue.closeAllNotifications()}));
    else if (typeof title_text_defaultTitle === "boolean") {
      noti = this.queue.appendNotification(new Notification(fc(type), text, type, (p) => {this.queue.closeNotification(p)}, () => {this.queue.closeAllNotifications()}));
    }
    (async () => {
      await delay(5000);
      noti.close();
    })();
    return noti;
  }
}
