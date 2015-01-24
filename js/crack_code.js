~ function($) {
    var codeImg = new Image();
    var Crack = {
        init: function() {
            codeImg.onload = function() {
                Crack.getCodeText();
            }
            codeImg.src = '/ImageCodeNew?date=' + new Date().getTime();
        },
        image2base64: function(img) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL();
        },
        getCodeText: function() {
            var base64 = this.image2base64(codeImg);
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'http://ocr.yulonh.com/',
                data: {
                    base64: base64
                },
                success: function(data, xhr, status) {
                    var rand = data.text;
                    if (rand.length !== 4) {
                        codeImg.src = '/ImageCodeNew?date=' + new Date().getTime();
                        return;
                    }
                    Crack.validate(rand);
                },
                error: function() {
                    codeImg.src = '/ImageCodeNew?date=' + new Date().getTime();
                }
            });
        },
        validate: function(rand) {
            $.get('RandValidateAction', {
                rand: rand,
                t: new Date().getTime()
            }, function(res) {
                if (res == 0) {
                    codeImg.src = '/ImageCodeNew?date=' + new Date().getTime();
                } else {
                    $('#rand').val(rand);
                    $('#btnProdOk').trigger('click');
                }
            });
        }
    };
    Crack.init();
}(Zepto);