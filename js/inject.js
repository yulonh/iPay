~ function() {
  //
  var W = window;
  var href = W.location.href;
  var doc = document;
  //
  var phoneNode, nextBtn, types,
    tLength = 0;
  var img = doc.getElementById('imgCode');

  function testNext() {
    chrome.runtime.sendMessage({
      action: "nextAccount"
    }, function(account) {
      types.each(function() {
        var type = $(this);
        type.trigger('click');
        phoneNode.val(account);
        nextBtn.trigger('click');
        console.log('testing ', account, type.next().text());
      });
    });
  }

  function image2base64(img) {
    var canvas = doc.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  }

  function getRandCode() {
    var base64 = image2base64(img);
    $.post('http://ocr.yulonh.com/', {
      base64: base64
    }, function(data) {
      res = data.text.replace(/[^\d]/g, '');
      if (res.length !== 4) {
        img.src = '/ImageCodeNew?date=' + new Date().getTime();
        return;
      }
      $('#rand').val(res);
      $('#435005').trigger('click');
      $('#btnProdOk').trigger('click');
    });
  }


  document.onreadystatechange = function() {
    if ('complete' === document.readyState) {

      if (href.indexOf('http://pay.tianxiafu.cn/435_km_0.html') !== -1) {
        img.onload = getRandCode;
        getRandCode();

        $(doc).on('ajaxComplete', function(e, xhr, opt) {
          if (opt.url.indexOf('RandValidateAction') !== -1) {
            var res = JSON.parse(xhr.responseText);
            if (res == 0) {
              img.src = '/ImageCodeNew?date=' + new Date().getTime();
            } else {
              $('#435005').trigger('click');
              $('#btnProdOk').trigger('click');
            }
          }
        });
      }

      if (href.indexOf('http://pay.tianxiafu.cn//Step2Action') !== -1) {
        //
        $(doc).on('ajaxComplete', function(e, xhr, opt) {
          //提交结果判定
          if (opt.url === 'SubmitAction') {
            var res = JSON.parse(xhr.responseText);
            if (0 === res.resultTag) {
              testNext();
            } else {
              tIndex = 0;
            }
          }

          //页面加载完毕
          if (opt.url.indexOf('FeeModelAction?modelId=') !== -1) {
            phoneNode = $('#con3phone1');
            nextBtn = $('#ydsjbtnCon3FormSubmit');
            types = $('#ydsj_yzm_cashTab :radio');
            tLength = types.length;
            testNext();
          }

        });
      }

      if (href.indexOf('/Step3Action') !== -1) {
        availableAccouts[account] = indexWin;
        console.log('Step3Action', aIndex, aLength);
        aIndex++;
        if (aIndex < aLength) {
          this.openIndexWindow();
        } else {
          console.log('all test complete');
        }
      }

    }
  };



}();