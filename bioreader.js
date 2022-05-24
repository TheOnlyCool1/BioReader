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
            if (split[j].indexOf("<") == -1 && split[j].indexOf(">") >= 0) {
                // Merges the two halves of the tag
                split.splice(j-1,2,split[j-1]+split[j]);
                j--;
            }

            // Separates HTML tag without space at the end
            if (split[j].charAt(0) == '<') {

                let end = split[j].indexOf(">");
                let itemHTML = split[j].substring(0,end+1);
                let itemText = "<b>" + split[j].slice(end+1) + "</b>"

                // Replaces the current element with two elements
                // First is the HTML part, second is the text part of the word.
                split.splice(j,1,itemHTML,itemText);

                // Adds 1 element, so increments j
                j++;
            }
        }

        // Inserting bold tags
        for(var j = 0; j < split.length; j++) {

        }

        // Assembling result
        let result = "";
        split.forEach((value, index, array) => {result += value + " "});

        p[i].innerHTML = result;
    }
}

// Old version, from prior to abandonment
function bionicPageOld() {
    let p = document.getElementsByTagName("p");
    // Maybe search with more tags like "div" and not just "p"

    // Loops through all elements
    for (var i = 0; i < p.length; i++) {
        //div[i].style.fontWeight = "bolder"; How to make the font bold, only works for one element (unmodified means a whole text block)

        // Attempts to get the text, although idk if it actually works since chrome console.log doesn't work with scripting.executeScript()
        let text = p[i].textContent;
        // Splits text into words
        let split = text.split(" ");
        //let parent = p[i].parentElement;

        // Tries to break text blocks into words, currently don't know where or how to place the nodes.
        for (var j = 0; j < split.length; j++) {
            // Creates node
            let node = document.createTextNode(split[j]);
            // Adds the node (to the wrong place as of now)
            div[i].appendChild(node);

            // Should divide the words in two and embolden them, rounding up.
            // Not implemented since I can't even get normal text to work, but once that's up it should be simple.
        }
        // Removes old text block once done
        div[i].remove();
    }
}