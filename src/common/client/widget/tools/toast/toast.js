var $ = require('common:widget/lib/jquery/jquery.js');

require('./toast.scss');
var toastTimer = null,
	dom = $(".ui-toast-bg");
function toast( text , show_time ){
	if( dom.length == 0 ){
		dom = $('<div class="ui-toast-bg"><span class="ui-toast-wrap"></span></div>');
		$("body").append(dom);
	}
	dom.find(".ui-toast-wrap").text(text);
	dom.show();
	
	if(toastTimer){
		clearTimeout(toastTimer);
	}

	toastTimer = setTimeout(function(){
		dom.hide();
	},show_time || 1500);
}

module.exports = toast;