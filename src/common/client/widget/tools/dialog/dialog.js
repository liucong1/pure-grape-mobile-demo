/**
 * 一个简单的弹框（只支持两个按钮，等有时间了，再改）
 * Created by liucong，2016-07-19 13:07
 **/ 

var $ = require('common:widget/lib/jquery/jquery.js');
var dom = $(".ui-dialog-box");

var dialog = {
    show( params ){
        if( params ){
            var title = params.title ,
                content = params.content,
                buttons = params.buttons;

            if( dom.length == 0 ){
                dom = $('<div class="ui-dialog-box">' +
                    '<div class="ui-dialog-bg"></div>' +
                    '<div class="ui-dialog-content">' +
                    '<div class="dialog-title"></div>' +
                    '<div class="dialog-content"></div>' +
                    '<div class="dialog-button-box">' +
                    '<div class="dialog-button dialog-button-left"></div>'+
                    '<div class="dialog-button dialog-button-right"></div>'+
                    '</div>' +
                    '</div>'+
                    '</div>');
                $("body").append(dom);
            }

            dom.find(".ui-dialog-content").css({
                "top": "50%",
                "left": "50%",
                "transform": "translate(-50%,-50%)",
                "-webkit-transform": "translate(-50%,-50%)"
            });

            dom.find(".dialog-title").text(title);
            dom.find(".dialog-content").html(content);
            dom.find(".dialog-button-left").text(buttons[0].text);
            dom.find(".dialog-button-right").text(buttons[1].text);

            dom.find(".dialog-button-left").unbind("click").on("click",function(){
                if( typeof(buttons[0].click) == 'function' ){
                    buttons[0].click();
                }
            });
            dom.find(".dialog-button-right").unbind("click").on("click",function(){
                if( typeof(buttons[1].click) == 'function' ){
                    buttons[1].click();
                }
            });
            dom.show();
        }else if( dom.length != 0 ){
            dom.show();
        }
    },

    hide(){
        dom.hide();
    }
};


module.exports = dialog;