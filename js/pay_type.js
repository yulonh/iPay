~ function($) {
    var isLoaded = $('#ydsjyzmForm').length > 0;
    isLoaded && start();

    var types;
    var i = 0,
        l;

    $(document).on('ajaxComplete', function(e, xhr, opt) {
        if (opt.url.indexOf('FeeModelAction?') !== -1 && !isLoaded) {
            start();
        }
        if (opt.url.indexOf('SubmitAction') !== -1) {
            var res = JSON.parse(xhr.responseText);
            if (res.resultTag === 0) {
                i < l ? nextType() : nextAccount();
            } else {
                nextAccount(true);
            }
        }
    });


    function nextType() {
        var next = types.eq(i);
        next.trigger('click');
        $('#ydsjbtnCon3FormSubmit').trigger('click');
        i++;
    }

    window.addEventListener("message", function(event) {
        // We only accept messages from ourselves
        if (event.source != window)
            return;

        if (event.data && event.data.msg === 'nextAccount') {
            if (event.data.account) {
                $('#con3phone1').val(event.data.account);
                nextType();
            } else {
                console.log('complete!');
            }
        }
    }, false);

    function nextAccount(newPage) {
        i = 0;
        window.postMessage({
            msg: 'getNextAccount',
            newPage: newPage
        }, "*");
    }

    function start() {
        types = $('#ydsj_yzm_cashTab [name="cashRadio"]');
        l = types.length;
        nextAccount();
    }

}(jQuery);