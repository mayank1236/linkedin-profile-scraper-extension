chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url && tab.url.includes("linkedin.com/in")) {
        
        const queryParameters = tab.url.split("in/")[1];
        
        chrome.tabs.sendMessage(tabId, {
            type: "LOADED",
            profileId: queryParameters,
        });

        chrome.runtime.onMessage.addListener((obj, sender, response) => {
            const { action, value, linkProfile } = obj;

            if(action === "profile") {
                console.log(linkProfile);
            }
        })
    }
})