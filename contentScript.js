(() => {
    let currentProfile = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, profileId } = obj;

        if (type === "LOADED") {
            currentProfile = profileId;
            let data = newProfileLoaded();
            if(data) {
                chrome.runtime.sendMessage({
                    action: "profile",
                    linkProfile: data
                });
            }
        }
    });


    const newProfileLoaded = () => {
        //HTML from DOM
        let linkedinProfileData = [];
        let linkedinProfile = document.body.querySelector("main");
        let profile = {};
        
        //Profile data from HTML retreived
        for(let j = 0; j < linkedinProfile.querySelectorAll("section").length; j++) {
            linkedinProfileData.push(new Set(String(linkedinProfile.querySelectorAll("section")[j].innerText).split("\n")));
        }
        
        for(let [i, data] of linkedinProfileData.entries()) {
            linkedinProfileData[i] = Array.from(data);
        }

        Object.assign(profile, linkedinProfileData);
        return JSON.stringify(profile);
    }
})();

