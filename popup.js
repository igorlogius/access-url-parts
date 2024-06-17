/* global browser */

const pc = document.querySelector("#parts-container");

let counter = 1;

function addPart(text, href) {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  a.setAttribute("short", counter);
  a.setAttribute("target", "_blank");
  const div = document.createElement("div");
  div.setAttribute("class", "part");
  if (counter < 10) {
    div.textContent = "(" + counter + ") : " + text;
  } else {
    div.textContent = text;
  }
  a.appendChild(div);
  pc.appendChild(a);
  counter++;
}

(async function init() {
  try {
    const url = new URL(await browser.runtime.sendMessage("url"));
    let tmp = url.pathname;
    let parts = tmp.split("/");
    let joined = "";
    while (parts.length > 0) {
      joined = parts.join("/");
      if (joined !== "" && parts[parts.length - 1] !== "") {
        addPart("/" + parts[parts.length - 1], url.origin + joined);
      }
      parts.pop();
    }
    addPart(url.origin, url.origin);
  } catch (e) {
    console.error(e.toString());
  }
})();

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      //console.debug("event.key", event.key);
      document.querySelector('a[short="' + event.key + '"]').click();
      break;
    default:
      break;
  }
});
