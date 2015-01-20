function gzbautoScroll(widthSum) {
  if ($(".center_font ul").css("marginLeft").match(/\d+/) == widthSum) {
    $(".center_font ul").css("marginLeft", 0);
  } else {
    $(".center_font ul").css("marginLeft", -$(".center_font ul").css("marginLeft").match(/\d+/) - 1);
  }
}
var regx = {
  mobile: /^1([3]{1}[4-9]{1}|[4]{1}[7]{1}|[5]{1}[012789]{1}|[7]{1}[8]{1}|[8]{1}[23478]{1})\d{8}$/,
  dxmobile: /^1([3]{1}[3]{1}|[5]{1}[3]{1}|[7]{1}[7]{1}|[8]{1}[019]{1})\d{8}$/,
  dxandmobile: /^1([3]{1}[3-9]{1}|[5]{1}[0123789]{1}|[8]{1}[1237809]{1})\d{8}$/,
  ltmobile: /^1([3]{1}[0-2]{1}|[5]{1}[56]{1}|[4]{1}[5]{1}|[7]{1}[6]{1}|[8]{1}[56]{1})\d{8}$/,
  ltandmobile: /^1([3]{1}[012456789]{1}|[5]{1}[01256789]{1}|[4]{1}[57]{1}|[8]{1}[235678]{1})\d{8}$/,
  ltanddxmobile: /^1([3]{1}[0-3]{1}|[5]{1}[356]{1}|[4]{1}[5]{1}|[8]{1}[01569]{1})\d{8}$/,
  ltanddxandmobile: /^1([3]{1}[0-9]{1}|[5]{1}[012356789]{1}|[4]{1}[57]{1}|[8]{1}[012356789]{1})\d{8}$/,
  tel: /^[2-8]{1}\d{6,7}$/
}

var showMsg = {
  "phone1": {
    "tips": "请输入手机号码!",
    "empty": "手机号码不能为空!",
    'warn': '请输入正确的移动手机号码!',
    'pass': ' '
  },
  "phone2": {
    "tips": "请输入手机号码!",
    "empty": "手机号码不能为空!",
    'warn': '请输入正确的电信手机号码!',
    'pass': ' '
  },
  "phone3": {
    "tips": '\u8BF7\u8F93\u5165\u56FA\u5B9A\u7535\u8BDD\uFF01',
    'empty': '\u7535\u8BDD\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A\!',
    'warn': '\u8F93\u5165\u7684\u56FA\u5B9A\u7535\u8BDD\u683C\u5F0F\u4E0D\u6B63\u786E\uFF01',
    'pass': ' '
  },
  "phone4": {
    "tips": "请输入手机号码!",
    "empty": "手机号码不能为空!",
    'warn': '请输入正确的手机号码!',
    'pass': '正确!'
  },
  'phone5': {
    'tips': '请输入11位的手机号码，如13012341234',
    'empty': '手机号码不能为空!',
    'warn': '请输入正确的联通手机号码!',
    'pass': '正确!'
  },
  //"phone5":{"tips":"\u8BF7\u8F93\u516511\u4F4D\u7684\u624B\u673A\u53F7\u7801\uFF0C\u598213812341234","empty":"\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A\!",'warn':'\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801\!','pass':'\u6B63\u786E\!'},
  "phone6": {
    "tips": "\u8BF7\u8F93\u516511\u4F4D\u7684\u624B\u673A\u53F7\u7801\uFF0C\u598213812341234",
    "empty": "\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A\!",
    'warn': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801\!',
    'pass': '\u6B63\u786E\!'
  },
  "phone7": {
    "tips": "\u8BF7\u8F93\u516511\u4F4D\u7684\u624B\u673A\u53F7\u7801\uFF0C\u598213812341234",
    "empty": "\u624B\u673A\u53F7\u7801\u4E0D\u80FD\u4E3A\u7A7A\!",
    'warn': '\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801\!',
    'pass': '\u6B63\u786E\!'
  }
}
var showMsg_CN = {
  "phone1": {
    "tips": "请输入手机号码!",
    "empty": "手机号码不能为空!",
    'warn': '请输入正确的手机号码!',
    'pass': '正确!'
  },
  'phone2': {
    'tips': '请输入手机号码!',
    'empty': '手机号码不能为空!',
    'warn': '请输入正确的手机号码!',
    'pass': '正确!'
  },
  'phone3': {
    'tips': '如浙江 杭州 88888888',
    'empty': '电话号码不能为空!',
    'warn': '请输入正确的电话号码!',
    'pass': '正确!'
  },
  'phone5': {
    'tips': '请输入11位的手机号码，如13012341234',
    'empty': '手机号码不能为空!',
    'warn': '请输入正确的联通手机号码!',
    'pass': '正确!'
  },
  'phone6': {
    'tips': '请输入11位的手机号码，如13812341234',
    'empty': '手机号码不能为空!',
    'warn': '请输入正确的手机号码!',
    'pass': '正确!'
  },
  'phone7': {
    'tips': '请输入11位的手机号码13812341234',
    'empty': '手机号码不能为空!',
    'warn': '请输入正确的手机号码!',
    'pass': '正确!'
  }
}


//手机号码检查
function checkPhone(tagId) {
  var v = getLastChar(tagId);
  if (!$('#' + tagId).val()) {
    $('#span' + tagId).attr('class', 'form-tips ico-erro-tips');
    $('#span' + tagId).html(showMsg['phone' + v]['empty']);
    return false;
  } else {
    var regNum = regx.dxandmobile;

    if (v == 1) {
      regNum = regx.mobile;
    }
    if (v == 2) {
      regNum = regx.dxmobile;
    }
    if (v == 3) {
      regNum = regx.tel;
    }
    if (v == 4) {
      regNum = regx.mobile;
    }
    if (v == 5) {
      regNum = regx.ltmobile;
    }
    if (!regNum.test($('#' + tagId).val())) { //无法通过正则验证
      $('#span' + tagId).attr('class', 'form-tips ico-erro-tips');
      $('#span' + tagId).html(showMsg['phone' + v]['warn']);
      return false;
    } else {
      $('#span' + tagId).attr('class', 'form-tips ico-succ-tips');
      $('#span' + tagId).html(showMsg['phone' + v]['pass']);
      return true;
    }
  }
}

function getTips(tagId) {
  var v = getLastChar(tagId);
  $('#span' + tagId).attr('class', 'form-tips ico-tips');
  $('#span' + tagId).html(showMsg['phone' + v]['tips']);
}

//异步提交页面
/**
 * params 加密参数
 * prodId 产品id
 * phone 电话号码，固话带区号
 * payModelId 支付方式
 * payTypeId 支付类型
 * feeModelId 扣费方式
 * oneTag 是否只有一种支付方式
 * gkModel
 * phoneId 用户提交前检查号码，填写号码的id
 */
function step2formSubmit(params, prodId, phone, payModelId, payTypeId, feeModelId, oneTag, gkModel, phoneId) {
    jQuery.ajax({
      url: "SubmitAction", // 提交的页面
      data: {
        "params": params,
        "prodId": prodId,
        "phone": phone,
        "payModelId": payModelId,
        "payTypeId": payTypeId,
        "feeModelId": feeModelId,
        "oneTag": oneTag,
        "gkModel": gkModel
      }, // 从表单中获取数据
      type: "POST", // 设置请求类型为"POST"，默认为"GET"
      dataType: "json",
      beforeSend: function() // 设置表单提交前方法
        {
          if (checkPhone("" + phoneId + "") == false) {
            $("input.btn").val("下一步").removeClass("disbtn").removeAttr("disabled");
            return false;
          }
        },
      error: function(request) { // 设置表单提交出错     
        //dialogShow("表单提交出错，请稍候再试!");
        $("input.btn").val("下一步").removeClass("disbtn").removeAttr("disabled");
        return false;
      },
      success: function(data) {
        doData(data);
      }
    });
  }
  //数据判定处理
function doData(data) {
    if (data.resultTag == 0) {
      dialogShow(data.errorMsg);
      $("input.btn").val("下一步").removeClass("disbtn").removeAttr("disabled");
    }
    if (data.resultTag == 1 || data.resultTag == 2) {
      if (data.ebillingurl) {
        var myForm = document.getElementById('ydsjsmsForm');
        myForm.action = data.ebillingurl;
        myForm.target = '_blank';
        myForm.submit();
        //window.open(data.ebillingurl);
        setTimeout("formSubmit('post','Step3Action','params','" + data.params + "','reParams','" + data.reParams + "','payModelId'," + data.payModelId + ",'payTypeId'," + data.payTypeId + ",'feeModelId'," + data.feeModelId + ",'_self')", 500);
      } else
      if (!data.ydurl) {
        formSubmit('post', 'Step3Action', 'params', data.params, 'reParams', data.reParams,
          'payModelId', data.payModelId, 'payTypeId', data.payTypeId, 'feeModelId', data.feeModelId, '_self');
      } else {
        location.href = data.ydurl;
        //var myForm = document.getElementById('ydsjsmsForm'); 
        //myForm.action = data.ydurl ;
        //myForm.target = '_blank'; 
        //myForm.submit();
        //$("#ydsjsmsForm").attr({"action":data.ydurl,"target":"_blank"}).submit();
        //formSubmit('post','Step3Action','params',data.params,'reParams',data.reParams,'payModelId',data.payModelId,'payTypeId',data.payTypeId,'feeModelId',data.feeModelId,'_self');
        //setTimeout("formSubmit('post','Step3Action','params','"+data.params+"','reParams','"+data.reParams+"','payModelId',"+data.payModelId+",'payTypeId',"+data.payTypeId+",'feeModelId',"+data.feeModelId+",'_self')",500);
      }
    }
    if (data.resultTag == 3) {
      dialogShow(data.errorMsg);
      $("input.btn").val("下一步").removeClass("disbtn").removeAttr("disabled");
      return;
    }
  }
  //提交参数
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


$('#phone3').live('afterpaste keyup', function(e) {
  $("#phone3").val($("#phone3").val().replace(/\D/g, ''));
});
$('#phone3').live("blur", function() {
  checkTel(3);
});
$('#phone3').live("change", function() {
  checkTel(3);
});
$('#phone3').live("click", function() {
  getTips(3);
});

/*
$('#phone5').blur(function(){
  checkPhone(5);
});
$('#phone5').change(function(){
  checkPhone(5);
});
$('#phone6').blur(function(){
  checkPhone(6);
});
$('#phone6').change(function(){
  checkPhone(6);
});
$('#phone7').blur(function(){
  checkPhone(7);
}); 
$('#phone7').change(function(){
  checkPhone(7);
});
 */
//获取字符串最后一个字符
function getLastChar(str) {
  var s = str.substr(str.length - 1, 1);
  return s;
}

$('#con1phone1').live('afterpaste keyup', function() {
  var temp = $.trim($("#con1phone1").val());
  if (/\D/gi.test(temp)) {
    temp = $("#con1phone1").val().replace(/\D/g, '')
    $("#con1phone1").val(temp);
  }
});
$('#con1phone1').live("blur", function() {
  checkPhone("con1phone1");
});
$('#con1phone1').live("change", function() {
  checkPhone("con1phone1");
});
$('#con1phone1').live("click", function() {
  getTips("con1phone1");
});


$('#con2phone1').live('afterpaste keyup', function(e) {
  //$("#con2phone1").val($("#con2phone1").val().replace(/\D/g,''));
  var temp = $.trim($("#con2phone1").val());
  if (/\D/gi.test(temp)) {
    temp = $("#con2phone1").val().replace(/\D/g, '')
    $("#con2phone1").val(temp);
  }
});
$('#con2phone1').live("blur", function() {
  checkPhone("con2phone1");
});
$('#con2phone1').live("change", function() {
  checkPhone("con2phone1");
});
$('#con2phone1').live("click", function() {
  getTips("con2phone1");
});


$('#con1phone2').live('afterpaste keyup', function(e) {
  //$("#con1phone2").val($("#con1phone2").val().replace(/\D/g,''));
  var temp = $.trim($("#con1phone2").val());
  if (/\D/gi.test(temp)) {
    temp = $("#con1phone2").val().replace(/\D/g, '')
    $("#con1phone2").val(temp);
  }
});
$('#con1phone2').live("blur", function() {
  checkPhone("con1phone2");
});
$('#con1phone2').live("change", function() {
  checkPhone("con1phone2");
});
$('#con1phone2').live("click", function() {
  getTips("con1phone2");
});


$('#con2phone2').live('afterpaste keyup', function(e) {
  //$("#con2phone2").val($("#con2phone2").val().replace(/\D/g,''));
  var temp = $.trim($("#con2phone2").val());
  if (/\D/gi.test(temp)) {
    temp = $("#con2phone2").val().replace(/\D/g, '')
    $("#con2phone2").val(temp);
  }
});
$('#con2phone2').live("blur", function() {
  checkPhone("con2phone2");
});
$('#con2phone2').live("change", function() {
  checkPhone("con2phone2");
});
$('#con2phone2').live("click", function() {
  getTips("con2phone2");
});

function getAreaForFeeModel(payModelId, payTypeId, feeModelId, prodId, tabId) {
  $("#wenxintishi").attr("style", "display:none");
  $.ajax({
    type: "post",
    url: "HaoduanAction",
    dataType: "json",
    async: true,
    data: {
      "payModelId": payModelId,
      "payTypeId": payTypeId,
      "feeModelId": feeModelId,
      "prodId": prodId
    },
    success: function(data) {
      if (payModelId == 1 && payTypeId == 1 && feeModelId == 1) {
        $("#wenxintishi").attr("style", "display:display");
      }
      if (!data.area) {
        $("#" + tabId + " span[name='area']").html("");
        $("#" + tabId + " span[name='feeModelIntroduce']").html("");
      } else {
        if (payModelId == '2' && payTypeId == '1' && feeModelId == '3') {
          var htm = "安徽，湖北，广西，重庆，青海，陕西，宁夏，贵州，海南，西藏 ，江苏。";
          $("#" + tabId + " span[name='area']").html(htm);
        } else {
          $("#" + tabId + " span[name='area']").html(data.area);
        }
        $("#" + tabId + " span[name='feeModelIntroduce']").html(data.TYPEINFO);
      }
    }
  });
}


function getCookie(name) //取cookies函数        
  {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;

  }

function delCookie(name) //删除cookie
  {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

function SetCookie(name, value) //两个参数，一个是cookie的名子，一个是值
  {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  }

//2012-11-26 郭振斌 增加获取随机整数的函数
function RndNum(n) {
  var rnd = "";
  for (var i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}