~ function() {
  var mainTab;
  var indexUrl = 'http://pay.tianxiafu.cn/191_km_0.html?modelIds2=1&come=zhaoka_ydyy';
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

  function cookieObject(cookie) {
    var cookies = cookie.match(/\S+=\S+/g);
    var length = cookies.length;
    var object = {};
    for (var i = 0; i < length; i++) {
      var nv = cookies[i].split('=');
      object[nv[0]] = nv[1].replace(';', '');
    };
    return object;
  }

  function object2Cookie(object) {
    var cookie = [];
    for (var k in object) {
      var val = object[k];
      cookie.push([k, val].join('='));
    };
    return cookie.join(';');
  }

  var iPay = {
    init: function() {
      //
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.action && iPay[request.action]) {
            sendResponse(iPay[request.action](sender.tab.id) || {});
          }
        });
      //
      // chrome.webRequest.onBeforeSendHeaders.addListener(
      //   function(details) {
      //     for (var i = 0; i < details.requestHeaders.length; ++i) {
      //       var cookie = cookies[details.tabId];
      //       if (details.requestHeaders[i].name === 'Cookie' && cookie) {
      //         var raw = cookieObject(details.requestHeaders[i].value);
      //         var change = cookieObject(cookie);
      //         for (var k in change) {
      //           if (change.hasOwnProperty(k)) {
      //             raw[k] = change[k];
      //           }
      //         }
      //         details.requestHeaders[i].value = object2Cookie(raw);
      //         // console.log(details.tabId, details.requestHeaders[i].value);
      //         break;
      //       }
      //     }
      //     return {
      //       requestHeaders: details.requestHeaders
      //     };
      //   }, {
      //     urls: ["*://pay.tianxiafu.cn/*"]
      //   }, ["blocking", "requestHeaders"]);
      //
      chrome.webRequest.onHeadersReceived.addListener(
        function(details) {
          for (var i = 0; i < details.responseHeaders.length; ++i) {
            if (details.responseHeaders[i].name === 'Set-Cookie') {
              cookies[details.tabId] = details.responseHeaders[i].value.replace('Path=/; HttpOnly', '');
              console.log(details.tabId, 'set cookie with ', cookies[details.tabId], ' by ', details.url);
              break;
            }
          }
          return {
            requestHeaders: details.responseHeaders
          };
        }, {
          urls: ["*://pay.tianxiafu.cn/*"]
        }, ["blocking", "responseHeaders"]);
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