"use strict";
let activeTabId = null;
let tabStartTime = Date.now();
try {
    chrome.tabs.onActivated.addListener(async (activeInfo) => {
        const CurrentTime = Date.now();
        if (activeTabId !== null) {
            const timeSpentSeconds = Math.floor((CurrentTime - tabStartTime) / 1000);
            console.log(`Tab ${activeTabId}: You've spent ${timeSpentSeconds} seconds in this tab.`);
        }
        activeTabId = activeInfo.tabId;
        tabStartTime = CurrentTime;
        console.log(`Switched to new tab ${activeTabId} at ${new Date(tabStartTime).toLocaleTimeString()}`);
        async function fetchBored() {
            const response = await fetch("https://bored-api.appbrewery.com/random");
            const activity = await response.json();
            return activity;
        }
        const atividade = await fetchBored();
        console.log(`${atividade.activity}`);
    });
}
catch {
    console.error('idk man its wrong');
}
