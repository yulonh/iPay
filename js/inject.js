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
                              setTimeout("formSubmit('post','Step3Action','params','" + data.params + "','reParams','" + data.reParams + "','payModelId'," + data.payModelId + ",'payTypeId'," + data.payTypeId + ",'feeModelId'," + data.feeModelId + ",'_self')", 500);
                            } else
                            if (!data.ydurl) {
                              formSubmit('post', 'Step3Action', 'params', data.params, 'reParams', data.reParams,
                                'payModelId', data.payModelId, 'payTypeId', data.payTypeId, 'feeModelId', data.feeModelId, '_self');
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

  function onPayTypeLoaded(html) {

    chrome.runtime.sendMessage({
      action: "nextAccount"
    }, function(res) {
      if (!account) {
        console.log('complete!');
        return;
      }

      var wrap = $(html);
      wrap.find('#ydsj_yzm_cashTab [name="cashRadio"]').each(function() {

        $.post('SubmitAction', {
            "params": data.params,
            "prodId": 435005,
            "phone": account,
            "payModelId": 1,
            "payTypeId": 3,
            "feeModelId": $(this).attr("id").replace("ydsj_cashRadio_con3_", ""),
            "oneTag": true,
            "gkModel": 1
          },
          function(data) {
            console.log(data);
          }, 'json');

      });

    });

  }

  function formSubmit(type, action, params, paramsValues, reParams, reParamsValue,
    payModelId, payModelIdValue, payTypeId, payTypeIdValue,
    feeModelId, feeModelIdValue, target) {

    var form1 = $("<form></form>")
    form1.attr({
      "action": action,
      "method": type,
      "target": target
    });
    var myInput1 = $("<input type='hidden'/>");
    myInput1.attr('value', paramsValues);
    myInput1.attr('name', params);
    form1.append(myInput1);

    var myInput2 = $("<input type='hidden'/>");
    myInput2.attr('value', payModelIdValue);
    myInput2.attr('name', payModelId);
    form1.append(myInput2);

    var myInput3 = $("<input type='hidden'/>");
    myInput3.attr('value', payTypeIdValue);
    myInput3.attr('name', payTypeId);
    form1.append(myInput3);

    var myInput4 = $("<input type='hidden'/>");
    myInput4.attr('value', feeModelIdValue);
    myInput4.attr('name', feeModelId);
    form1.append(myInput4);

    var myInput5 = $("<input type='hidden'/>");
    myInput5.attr('value', reParamsValue);
    myInput5.attr('name', reParams);
    form1.append(myInput5);

    form1.appendTo("body");
    form1.css('display', 'none');
    form1.submit();
    form1.remove();
  }

  $(document).on('ajaxComplete', function(e, xhr, options) {
    //console.log(xhr, options);
  });
  $(document).on('ajaxError', function(e, xhr, options) {
    if (options.url === "http://ocr.yulonh.com/") {
      getRandCode();
    }
  });

  // if (href.indexOf('http://pay.tianxiafu.cn/435_km_0.html') !== -1) {}

  // if (href.indexOf('http://pay.tianxiafu.cn//Step2Action') !== -1) {
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
  // }

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