chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            function: bionicPage
        });
    }
});

function bionicPage() {
    let div = document.getElementsByTagName("p");
    //Maybe search with more tags like "div" and not just "p"

    //Loops through all elements
    for (var i = 0; i < div.length; i++) {
        //div[i].style.fontWeight = "bolder"; How to make the font bold, only works for one element (unmodified means a whole text block)

        //Attempts to get the text, although idk if it actually works since chrome console.log doesn't work with scripting.executeScript()
        let text = div[i].textContent;
        //Splits text into words
        let split = text.split(" ");
        //let parent = div[i].parentElement;

        //Tries to break text blocks into words, currently don't know where or how to place the nodes.
        for (var j = 0; j < split.length; j++) {
            //Creates node
            let node = document.createTextNode(split[j]);
            //Adds the node (to the wrong place as of now)
            div[i].appendChild(node);

            //Should divide the words in two and embolden them, rounding up.
            //Not implemented since I can't even get normal text to work, but once that's up it should be simple.
        }
        //Removes old text block once done
        div[i].remove();
    }
}