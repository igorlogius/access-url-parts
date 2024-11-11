/* global browser */
browser.runtime.onMessage.addListener(async function (msg /*, sender*/) {
  if (msg === "url") {
    const tab = await browser.tabs.query({ currentWindow: true, active: true });
    return tab[0].url;
  }
});

browser.commands.onCommand.addListener(async (cmd) => {
  if (cmd === "moveup") {
    const atab = (
      await browser.tabs.query({ currentWindow: true, active: true })
    )[0];
    const url = new URL(atab.url);
    let tmp = url.pathname;

    if (tmp.endsWith("/")) {
      tmp = tmp.slice(0, tmp.length - 1);
    }

    tmp = tmp.split("/");

    if (tmp.length > 1) {
      tmp = tmp.slice(0, tmp.length - 1).join("/");
      //console.debug(url.origin + tmp);

      browser.tabs.update(atab.id, {
        url: url.origin + tmp,
      });
    }
  }
});
