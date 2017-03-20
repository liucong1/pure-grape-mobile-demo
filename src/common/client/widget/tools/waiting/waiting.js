var $ = require('common:widget/lib/jquery/jquery.js');

var waiting = {
    show:function(){
        var dom = $(".ui-waiting-box");
        if( dom.length == 0 ){
            dom = $('<div class="ui-waiting-box"><div class="ui-waiting-bg"></div></div>');
            var img_url = __uri("./assets/loadinfo.net.gif");
            dom.append('<div class="imgBox"><img src="' + img_url + '" alt="Loading..."/></div>')
            $("body").append(dom);
        }
        $(".ui-waiting-box").show();
    },
    hide:function(){
        var dom = $(".ui-waiting-box");
        if(dom.length > 0){
            $(".ui-waiting-box").hide();
        }
    }
};

module.exports = waiting;