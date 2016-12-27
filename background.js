//if (Notification.permission !== "granted") {
//    Notification.requestPermission();
//}
//var queryInfo = {
//    url: "*://music.163.com/*"
//};
//var music163tab = new Object();
//
//chrome.tabs.query(queryInfo, function (callback) {
//    //if the extension is reloaded, try to refresh music.163.com if there is one, else, create one.
//    if (callback.length != 0) {
//        music163tab = callback[0];
//        chrome.tabs.reload(music163tab.id);
//    } else {
//        chrome.tabs.create({
//            "url": "http://music.163.com/"
//        },function(tab){
//            music163tab = tab;
//        });
//    }
//}); 
//
chrome.commands.onCommand.addListener(function (callback) {
   chrome.tabs.sendMessage(music163tab.id, callback);
});
//
chrome.browserAction.onClicked.addListener(function () {
	chrome.runtime.reload();
});