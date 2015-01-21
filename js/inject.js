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
          }, function(res) {
            var data = JSON.parse(res);
            if (data.resultTag === 1) {
              $.get('http://pay.tianxiafu.cn//FeeModelAction?modelId=1&prodId=435005&businessType=1', {
                '_': +new Date().getTime()
              }, function(html) {

                var wrap = $(html);
                var types = wrap.find('#ydsj_yzm_cashTab [name="cashRadio"]');
                var length = types.length;
                var i = 0;
                nextAccount();

                function nextAccount() {
                  chrome.runtime.sendMessage({
                    action: "nextAccount"
                  }, function(msg) {
                    if (!msg.account) {
                      console.log('complete!');
                      return;
                    }

                    nextType();

                    function nextType() {
                      console.log('tesing ', msg.account, i, ' times');
                      if (i >= length) {
                        i = 0;
                        nextAccount();
                        return;
                      }

                      var type = types.eq(i);

                      $.post('SubmitAction', {
                          "params": data.params,
                          "prodId": 435005,
                          "phone": msg.account,
                          "payModelId": 1,
                          "payTypeId": 3,
                          "feeModelId": type.attr("id").replace("ydsj_cashRadio_con3_", ""),
                          "oneTag": true,
                          "gkModel": 1
                        },
                        function(data) {

                          if (data.resultTag == 1 || data.resultTag == 2) {
                            if (data.ebillingurl) {
                              var myForm = wrap.find('#ydsjsmsForm')[0];
                              myForm.action = data.ebillingurl;
                              myForm.target = '_blank';
                              myForm.submit();
                              setTimeout(function() {
                                SubmitAction(data);
                              }, 500);
                            } else
                            if (!data.ydurl) {
                              formSubmit(data);
                            } else {
                              location.href = data.ydurl;
                            }
                            //
                            chrome.runtime.sendMessage({
                              action: "openIndexWindow"
                            }, function(msg) {});
                          } else {
                            i++;
                            nextType();
                          }


                        }, 'json');

                    };


                  });

                }

              });
            }
          });
        }
      });

    });
  }

  function formSubmit(data) {
    var form = document.createElement('form');
    form.action = "Step3Action";
    for (var k in data) {
      if(data.hasOwnProperty(k)){
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = data[k];
        form.appendChild(input);
      }
    };
    form.submit();
  }

  $(document).on('ajaxError', function(e, xhr, options) {
    if (options.url === "http://ocr.yulonh.com/") {
      getRandCode();
    }
  });
}();