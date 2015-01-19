~ function() {

  var main = {
    init: function() {
      $('#start').on('click', $.proxy(function(e) {
        e.preventDefault();
        //
        chrome.runtime.sendMessage({
          action: "start"
        }, function(response) {
          console.log(response);
        });
        //
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            if (request.action) {
              sendResponse(main[request.action]());
            }
          });

      }, this));
    },
    accounts: function() {
      var accounts = $('#accounts').val().trim();
      return accounts && accounts.split(/[^\d]+/);
    }
  };

  main.init();

}();