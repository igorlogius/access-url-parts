/* global browser */

let counter = 1;

document.addEventListener("DOMContentLoaded", async function () {
  function addPart(text, href) {
    const pc = document.querySelector("#parts-container");
    const a = document.createElement("a");
    a.setAttribute("href", href);
    a.setAttribute("short", counter);
    a.setAttribute("target", "_blank");
    const div = document.createElement("div");
    div.setAttribute("class", "part");
    if (counter < 10) {
      div.textContent = text; // + " |" + counter + "|";
    } else {
      div.textContent = text;
    }
    a.appendChild(div);
    pc.appendChild(a);
    counter++;
  }

  try {
    const tabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    const url = new URL(tabs[0].url);

    if (url.origin === "null") {
      window.close();
      return;
    }
    let parts = url.pathname.split("/");
    let joined = "";

    let prepend = url.origin + "/";
    addPart(url.hostname, url.origin);

    while (parts.length > 0) {
      if (parts[0] !== "") {
        prepend = prepend + "/" + parts[0];
        addPart(parts[0], prepend);
      }
      parts.shift();
    }

    document.addEventListener("keydown", function (event) {
      if (/[1-9]/.test(event.key)) {
        const el = document.querySelector('a[short="' + event.key + '"]');
        if (el !== null) {
          el.click();
        }
      }
    });
  } catch (e) {
    console.error(e.toString());
  }
});
