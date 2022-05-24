chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            function: bionicPage
        });
    }
});

// Useful resources:
    // Chrome extension API: https://developer.chrome.com/docs/extensions/mv3/getstarted/
    // HTML DOM Documents: https://www.w3schools.com/jsref/dom_obj_document.asp
    // Bionic Reading Demonstration: https://www.w3schools.com/jsref/dom_obj_document.asp


function bionicPage() {
    let p = document.getElementsByTagName("p");

    // Loops through elements
    for (var i = 0; i < p.length; i++) {
        split = p[i].innerHTML.split(" ");
        
        // Separating & fixing HTML elements
        for(var j = 0; j < split.length; j++) {
            // Checks for HTML tag with space in it
            if (split[j].indexOf("<") >= 0 && split[j].indexOf(">") == -1) {
                // Merges the two halves of the tag
                split.splice(j,2,split[j]+" "+split[j+1]);
                j--;
            }
        }

        for (var j = 0; j < split.length; j++) {
            // Separates HTML tags from words, currently not perfect at all
            if (split[j].indexOf("<") >= 0) {
                let end = split[j].indexOf(">");
                let itemHTML = split[j].substring(0,end+1);
                let itemText = split[j].slice(end+1);

                // Replaces the current element with two elements
                // First is the HTML part, second is the text part of the word.
                split.splice(j,1,itemHTML,itemText);

                // Adds 1 element, so increments j
                j++;
            }
        }

        // Inserting bold tags
        for(var j = 0; j < split.length; j++) {
            let word = split[j];
            if (word.charAt(0) != '<') {
                split[j] = "<strong>" + word.substring(0,Math.ceil(word.length/2)) + "</strong>" + word.substring(Math.ceil(word.length/2));
            }
        }

        // Assembling result, merge array into single string
        let result = "";
        split.forEach((value, index, array) => {result += value + " "});

        p[i].innerHTML = result;
    }
}