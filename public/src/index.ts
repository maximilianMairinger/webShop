global.version = "beta";
console.log("Version: " + global.version);

document.addEventListener("DOMContentLoaded", () => {
  if (window.customElements && document.head.attachShadow) init();
});

async function init() {
  global.loading = new Promise((res) => {
    window.onload = () => {
      res();
    };
  });
  require("xrray")(Array);
  require("./global");
  const {default: PageManager} = require("./_element/_frame/_manager/pageManager/pageManager");
  const Notifier = require("./lib/notifier/notifier").default;

  const startPageName = "login";

  console.time("load");
  loading.then(() => {
    console.timeEnd("load");
  })

  load(startPageName);
  window.addEventListener("keydown", (e) => {
    //Only rerender the dom to save bandwith
    if ((e.ctrlKey && e.code === "KeyR") || e.code == "F5") {
      load(startPageName);
      e.preventDefault();
    }
  });
  //testing
  window.addEventListener("keydown", async (e) => {
    if (e.code === "KeyM") Notifier.error("sasd");
    else if (e.shiftKey && e.code === "KeyK") {
      Notifier.queue.closeAllNotifications();
    }
    else if (e.code === "KeyK") {
      try {
        let i = 0;
        let didCloseOne = await Notifier.queue.closeNotification(i);
        while (!didCloseOne) {
          i++;
          didCloseOne = await Notifier.queue.closeNotification(i);
        }
      }
      catch (e) {
        return;
      }
    }
  })

  function load(name: "main" | "login") {
    let b = document.querySelector("body");
    b.emptyNodes();
    let pm = new PageManager(name);
    b.append(pm);
    b.append(Notifier.queue);
    //@ts-ignore
    global.pm = pm;
  }
}
