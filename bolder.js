

chrome.webNavigation.onCompleted.addListener(function (ta) {
    let [tab] = chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: bionicPage
    });
});

function bionicPage() {
    /*var div = document.getElementsByTagName("div");
    var sp = document.getElementsByTagName("span");

    for (var i = 0; i < div.length; i++) {
        div[i].style.fontWeight = "bolder";
    }

    for (var i = 0; i < sp.length; i++) {
        [i].style.fontWeight = "bolder";
    }*/

    let text = document.getElementsByTagName("p");
    for (var i = 0; i < text.length; i++) {
        console.log(text[i]);

	}
}