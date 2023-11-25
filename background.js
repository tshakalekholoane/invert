chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" });
});

const toggle = (state) => state === "ON" ? "OFF" : "ON";

chrome.action.onClicked.addListener(async (tab) => {
  let state = await chrome.action.getBadgeText({ tabId: tab.id });
  state = toggle(state);

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: state,
  });

  const details = {
    files: ["invert.css"],
    target: { tabId: tab.id },
  };

  switch (state) {
    case "ON":
      await chrome.scripting.insertCSS(details);
      break;
    case "OFF":
      await chrome.scripting.removeCSS(details);
      break;
  }
});
