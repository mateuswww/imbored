let activeTabId: number | null = null;
let tabStartTime: number = Date.now();

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

try {
chrome.tabs.onActivated.addListener(async (activeInfo: chrome.tabs.OnActivatedInfo) => {
    const CurrentTime = Date.now();
    if (activeTabId !== null){
        const timeSpentSeconds = Math.floor((CurrentTime - tabStartTime) / 1000);
        console.log(`Tab ${activeTabId}: You've spent ${timeSpentSeconds} seconds in this tab.`)
    }

    activeTabId = activeInfo.tabId;
    tabStartTime = CurrentTime;
    console.log(`Switched to new tab ${activeTabId} at ${new Date(tabStartTime).toLocaleTimeString()}`);


    async function fetchBored(): Promise<Activity>{
        const response = await fetch("https://bored-api.appbrewery.com/random");
        const activity = await response.json();
        return activity;
    }
  
    const atividade:Activity = await fetchBored(); 

    console.log(`${atividade.activity}`);
})
} catch {
    console.error('idk man its wrong');
}

