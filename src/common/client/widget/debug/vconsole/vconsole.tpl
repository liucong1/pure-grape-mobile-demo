{% script %}

    var isProduction = '{{isProduction}}';

    if(isProduction == 'true'){
    if( location.href.indexOf('jdebug=jdebug') > 0 ){
        if(window.localStorage)
            require('common:widget/lib/vconsole/vconsole.min.js');
    }
    }else{
        if(window.localStorage)
            require('common:widget/lib/vconsole/vconsole.min.js');

    }

{% endscript %}