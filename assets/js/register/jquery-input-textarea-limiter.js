/**
 * ! jQuery-input-textarea-limiter 2.0
 *
 * Page URL     : http://www.juerry.com/
 * Mail         : 463449055@qq.com
 * QQ           : 463449055 
 * created      : 2013-12-24 10:59:00 
 * last update  : 2014-01-24 11:00:00
 * Add          : China zhuhai
 *
 * Copyright 2014 | http://www.juerry.com/ 
 */
;(function($) {
    $.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( limit - chars );
            }
            setCount($(this)[0], elem);
        },

        limiter_lite: function(limit) {
            $(this).on("keyup focus", function() {
                setCount(this);
            });
            function setCount(src) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
            }
            setCount($(this)[0]);
        }
    });
})(jQuery);

//例子:
// var elm=$("#msg_box");
// $("username").limiter(100,elm);
//第一个参数是限制字符数量，第二个是用于显示剩下的字符数的标签
//你也可以使用一个参数的limiter_lite()方法





