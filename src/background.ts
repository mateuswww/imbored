interface Activity{
    activity: string;
    availabity: number;
    type: string;
    participants: number;
    price: number;
    accessiblility: string;
    duration: string;
    kidFriendly: boolean;
    link: string;
    key: string;
}

let activeTabId: number | null = null;
const blocked = ["https://www.youtube.com/"];

async function getTabUrl(): Promise<string> {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  return tabs[0]?.url ?? "Unknown URL";
}

async function maybeAlarm(){
    const tab = await getTabUrl();
    blocked.some(element => {
        if (tab.includes(element)){
            chrome.alarms.create("tabTimer", {delayInMinutes: 0.05});
            console.log("timer created for" + tab);
        }
    });
}

async function fetchBored(): Promise<Activity>{
    const response = await fetch("https://bored-api.appbrewery.com/random");
    const activity = await response.json();
    return activity;
}

try {
chrome.tabs.onActivated.addListener(async (activeInfo: chrome.tabs.OnActivatedInfo) => {
    activeTabId = activeInfo.tabId;
    maybeAlarm();
    console.log(`Switched to new tab ${activeTabId}`);
})
} catch {
    console.error('idk man its wrong');
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
    maybeAlarm();
    }
});

chrome.alarms.onAlarm.addListener(async (alarm: chrome.alarms.Alarm) => {
if (alarm.name === "tabTimer") {
        await chrome.alarms.clear("tabTimer");
        const atividade:Activity = await fetchBored();   
        console.log(`${atividade.activity}`);

        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const pageTitle = currentTab?.title ?? "this tab";

        chrome.notifications.create({
        type: "basic",
        iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", // Must be a path to an image file or a placeholder
        title: "take a break from " + pageTitle,
        message: atividade.activity
        })
        maybeAlarm();
    }
});

/*
open new tab
create alarm for when it reaches its limit
if tab switches it resets
otherwise it waits and listens
when alarm goes off, fetch bored api
notify api result
upon pressing "ok", alarm resets
*/