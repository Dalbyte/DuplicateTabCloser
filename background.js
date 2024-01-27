chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      chrome.tabs.query({}, function (tabs) {
        var urls = {};
  
        // Sortiert die Tabs nach ihrer Erstellungszeit.
        tabs.sort((a, b) => a.id - b.id);
  
        for (var i = 0; i < tabs.length; i++) {
          if (urls[tabs[i].url]) {
            // Schließt den ältesten Tab mit der gleichen URL.
            chrome.tabs.remove(urls[tabs[i].url]);
          }
  
          // Speichert die Tab-ID anstelle von 'true'.
          urls[tabs[i].url] = tabs[i].id;
        }
      });
    }
  });