

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { action, value, message } = obj;
        if (action == 'bgToPopup') {
            let profile = JSON.parse(message);
            showProfile(profile);
        }
        document.querySelector("button").addEventListener("click", copyJson(profile));
    });

    function copyJson(profile) {
        
        let jsonObj = [];
        let para = document.createElement("p");

        for(let i = 0; i < Object.keys(profile).length; i++) {
            jsonObj.push({
                i: `
                <h3>${profile[i][0]}</h3>
                <div>${profile[i].join('\n')}<div>
                </br>
                `
            }) ;
        }

        navigator.clipboard.writeText(JSON.stringify(jsonObj));
        para.innerText = "Profile JSON copied to clipboard";
        document.getElementById("copy").appendChild(para);
    }

    function showProfile(profile) {
        let text;

        for(let i = 0; i < Object.keys(profile).length; i++) {
            text += `
                <h3>${profile[i][0]}</h3>
                <div>${profile[i].join('\n')}<div>
                </br>
            `;
        }
    
        document.getElementById("message").innerHTML = text;
        
    }




