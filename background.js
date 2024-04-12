/* global browser */
browser.runtime.onMessage.addListener(async function (msg /*, sender*/) {
  if (msg === "url") {
    const tab = await browser.tabs.query({ currentWindow: true, active: true });
    return tab[0].url;
  }
});
