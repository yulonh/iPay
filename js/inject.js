~ function() {
  //
  var phoneNode, nextBtn, types,
    tLength = 0;
  var img = new Image();
  img.onload = getRandCode;
  img.src = '/ImageCodeNew?date=' + new Date().getTime();

  function image2base64(img) {
    var canvas = document.createElement('canvas');
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
      var rand = data.text;
      if (rand.length !== 4) {
        img.src = '/ImageCodeNew?date=' + new Date().getTime();
        return;
      }

      $.get('RandValidateAction', {
        rand: rand,
        t: new Date().getTime()
      }, function(res) {
        if (res == 0) {
          img.src = '/ImageCodeNew?date=' + new Date().getTime();
        } else {
          $.post('ProductAction', {
            businessType: 1,
            pid: 435005,
            c: 0,
            rand: rand
          }, function(data) {
            console.log(data);
          });
        }
      });

    });
  }

  $(document).on('ajaxComplete', function(e, xhr, options) {
    //console.log(xhr, options);
  });
  $(document).on('ajaxError', function(e, xhr, options) {
    if (options.url === "http://ocr.yulonh.com/") {
      getRandCode();
    }
  });

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


  if (href.indexOf('http://pay.tianxiafu.cn/435_km_0.html') !== -1) {}

  if (href.indexOf('http://pay.tianxiafu.cn//Step2Action') !== -1) {
    //
    // $(doc).on('ajaxComplete', function(e, xhr, opt) {
    //   //提交结果判定
    //   if (opt.url === 'SubmitAction') {
    //     var res = JSON.parse(xhr.responseText);
    //     if (0 === res.resultTag) {
    //       testNext();
    //     } else {
    //       tIndex = 0;
    //     }
    //   }

    //   //页面加载完毕
    //   if (opt.url.indexOf('FeeModelAction?modelId=') !== -1) {
    //     phoneNode = $('#con3phone1');
    //     nextBtn = $('#ydsjbtnCon3FormSubmit');
    //     types = $('#ydsj_yzm_cashTab :radio');
    //     tLength = types.length;
    //     testNext();
    //   }

    // });
  }

  // if (href.indexOf('/Step3Action') !== -1) {
  //   availableAccouts[account] = indexWin;
  //   console.log('Step3Action', aIndex, aLength);
  //   aIndex++;
  //   if (aIndex < aLength) {
  //     this.openIndexWindow();
  //   } else {
  //     console.log('all test complete');
  //   }
  // }



}();