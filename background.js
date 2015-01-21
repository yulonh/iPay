~ function() {
  var mainTab;
  var indexUrl = 'http://pay.tianxiafu.cn/435_km_0.html?modelIds2=1&come=zhaoka_ydyy';
  var cookies = {};
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
  var accounts = [];
  var aIndex = 0,
    tIndex = 0;

  var iPay = {
    init: function() {
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.action && iPay[request.action]) {
            sendResponse(iPay[request.action](sender.tab.id) || {});
          }
        });
      //
      chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            var cookie = cookies[details.tabId];
            console.log('replace cookie with ', cookie, ' in ', details.url);
            if (details.requestHeaders[i].name === 'Cookie' && cookie) {
              details.requestHeaders[i].value = cookie;
              break;
            }
          }
          return {
            requestHeaders: details.requestHeaders
          };
        }, {
          urls: ["*://pay.tianxiafu.cn/*"]
        }, ["blocking", "requestHeaders"]);
      //
      chrome.webRequest.onHeadersReceived.addListener(
        function(details) {
          for (var i = 0; i < details.responseHeaders.length; ++i) {
            if (details.responseHeaders[i].name === 'Set-Cookie') {
              cookies[details.tabId] = details.responseHeaders[i].value;
              console.log('set cookie with ', details.responseHeaders[i].value, ' by ', details.url);
              break;
            }
          }
          return {
            requestHeaders: details.responseHeaders
          };
        }, {
          urls: ["*://pay.tianxiafu.cn/*"]
        }, ["blocking", "responseHeaders"]);
      //
      // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      //   if (tab.url === indexUrl) {
      //     chrome.cookies.get({
      //       url: indexUrl,
      //       name: 'JSESSIONID'
      //     }, function(cookie) {
      //       cookies[tabId] = ['JSESSIONID', cookie.value].join('=');
      //       console.log(cookies);
      //     });
      //   }
      // });
    },
    openIndexWindow: function() {
      if (!accounts[aIndex]) {
        console.log('complete!');
        return;
      }
      chrome.tabs.create({
        url: indexUrl
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
      var account = accounts[aIndex];
      if (account) {
        aIndex++;
        return {
          account: account
        }
      } else {
        return {
          account: null
        };
      }
    }
  };

  iPay.init();


}();