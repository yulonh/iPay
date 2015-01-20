~ function() {
  var mainTab;
  chrome.browserAction.onClicked.addListener(function(tab) {
    if (mainTab) {
      chrome.tabs.update(mainTab.id, {
        selected: true
      });
    } else {
      chrome.tabs.create({
          url: chrome.extension.getURL("manager.html"),
          selected: true
        },
        function(tab) {
          mainTab = tab;
        });
    }
  });

  var availableAccouts = {};
  var accounts = null;
  var aIndex = 0,
    tIndex = 0;

  var iPay = {
    init: function() {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

          if (request.action && iPay[request.action]) {
            sendResponse(iPay[request.action]() || {});
          }
        });
    },
    openIndexWindow: function() {
      chrome.tabs.create({
        url: 'http://pay.tianxiafu.cn/435_km_0.html?modelIds2=1&come=zhaoka_ydyy'
      }, function(tab) {

      });
    },
    start: function() {
      chrome.tabs.sendMessage(mainTab.id, {
        action: "accounts"
      }, function(data) {
        accounts = data;
        if (accounts.length) {
          aIndex = 0;
          tIndex = 0;
          console.log('accounts :', accounts);
          iPay.openIndexWindow();
        } else {
          alert('必须先输入账号!');
          return;
        }
      });

    },
    nextAccount: function() {
      return {
        account: accounts[aIndex++]
      };
    },
    verification: function() {

    }
  };

  iPay.init();


}();