~ function() {
    function injectScript(src) {
        var script = document.createElement('script');
        // TODO: add "script.js" to web_accessible_resources in manifest.json
        script.src = chrome.extension.getURL(src);
        script.onload = function() {
            this.parentNode.removeChild(this);
        };
        (document.head || document.documentElement).appendChild(script);
    }

    if (location.href.indexOf('/Step2Action') !== -1) {
        injectScript('js/pay_type.js');
        //
        window.addEventListener("message", function(event) {
            // We only accept messages from ourselves
            if (event.source != window)
                return;

            if (event.data && event.data.msg === 'getNextAccount') {
                event.data.newPage && chrome.runtime.sendMessage({
                    action: "openIndexWindow"
                });
                chrome.runtime.sendMessage({
                    action: "nextAccount"
                }, function(msg) {
                    window.postMessage({
                        msg: 'nextAccount',
                        account: msg.account
                    }, "*");
                });
            }
        }, false);
    }

}();