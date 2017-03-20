<!DOCTYPE html>
{% block block_assign %}
    {# 模板内赋值局部变量 #}
    {% set tpl_now = Date.now() %}
{% endblock %}
{% html lang="en" framework="common:static/js/mod.js" %}
    {% head %}
        <meta charset="utf-8">
        <script>
            window._jHeadStart = ( new Date() ).getTime();
            window.tplConf = {
                user : {
                    userId : '{{user.userId | raw | default("null") }}'
                },
                pageKey : '',
                autoPV : true,
                autoIdentify : true
            };
        </script>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        {# 360 浏览器就会在读取到这个标签后，立即切换对应的极速核 #}
        <meta name="renderer" content="webkit">
        <meta name="google-site-verification" content="oQXrGa_mTgxg7joO0himE0QuFeqOVmm-SDC1H2dzT4c">
        <meta name="baidu-site-verification" content="wibJopuIuI" />
        {# 禁止将页面数字识别为电话号码 #}
        <meta name="format-detection" content="telephone=no"/>
        {# 当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对ios的safari #}
        <meta name="apple-mobile-web-app-capable" content="yes"/>

        {% block header_content %}
            <meta name="keywords" content="">
            <meta name="description" content="">
            <title>{{ title }}</title>
        {% endblock %}

        {# 计算rem自适应方案的js #}
        <script>
            (function(){var l=window.document;var b=document.documentElement;var g=window;var m=0;var d=0;var e;window.remFlexible=window.remFlexible||{};var f=window.remFlexible;function j(){var n=b.clientWidth;b.style.fontSize=n/7.5+"px"}var i=l.querySelector('meta[name="viewport"]');if(i){i.parentNode.removeChild(i)}var h=g.navigator.appVersion.match(/android/gi);var c=g.navigator.appVersion.match(/iphone/gi);var k=g.devicePixelRatio;if(c){if(k>=3&&(!m||m>=3)){m=3}else{if(k>=2&&(!m||m>=2)){m=2}else{m=1}}}else{m=1}d=1/m;i=document.createElement("meta");i.setAttribute("name","viewport");i.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no");if(b.firstElementChild){b.firstElementChild.appendChild(i)}else{var a=l.createElement("div");a.appendChild(i);l.write(a.innerHTML)}g.addEventListener("resize",function(){clearTimeout(e);e=setTimeout(j,300)},false);g.addEventListener("pageshow",function(n){if(n.persisted){clearTimeout(e);e=setTimeout(j,300)}},false);if(l.readyState==="complete"){j()}else{l.addEventListener("DOMContentLoaded",function(n){j()},false)}j();b.setAttribute("data-dpr",m);f.dpr=m;f.px2rem=function(n){return n/100};f.rem2px=function(n){return n*100}})();
        </script>

        <link rel="shortcut icon" type="image/x-icon" href="/client/static/img/favicon.ico" />

        <link rel="stylesheet" type="text/css" href="/client/static/css/base.scss">

        {% block block_head_css %}

        {% endblock %}

        <script>
            !function(){var c=Object.prototype.toString;var a=/complete|loaded|interactive/;var m="m.we.com/s1/w.gif";var d="";var p=location.protocol;var k="";var l=p+"//"+m;function b(q){return c.call(q)==="[object String]"}function j(s,r){for(var q in r){if(r.hasOwnProperty(q)){s[q]=r[q]}}}function o(s){var q="";for(var r in s){q+=r+"="+encodeURIComponent(s[r])+"&"}return q}function g(t){var s=(new Date()).getTime();var r="___log_"+s;var q=new Image();window[r]=q;q.onload=q.onerror=function(){q.onload=q.onerror=null;window[r]=null;q=null};q.src=t+"&_r="+s}function f(t){var q={pl:d,pid:k};for(var s in t){if(t.hasOwnProperty(s)){if(!b(t[s])){q[s]=JSON.stringify(t[s])}else{q[s]=t[s]}}}var r=l+"?"+o(q);g(r)}var n=false;var i={};var e={init:function(q){d=q.platform;k=q.pageID;if(!k){k=location.pathname}},perf:{headStart:function(q){i.jhead_start=q;return e},bodyStart:function(q){q=q||(new Date()).getTime();i.jbody_start=q;return e},bodyEnd:function(q){q=q||(new Date()).getTime();i.jbody_end=q;return e},domReady:function(q){if(i.jdom_ready){return}q=q||(new Date()).getTime();i.jdom_ready=q;return e},fullLoad:function(q){q=q||(new Date()).getTime();i.jfull_load=q;return e},send:function(){if(!n){if(window.performance&&window.performance.timing&&typeof window.performance.timing.toJSON==="function"){j(i,window.performance.timing.toJSON())}f({perf:i})}n=true}}};if(a.test(document.readyState)&&document.body){e.perf.domReady()}else{if(typeof document.addEventListener==="function"){document.addEventListener("DOMContentLoaded",function(){e.perf.domReady()})}}window.weLogger=e;function h(){e.perf.fullLoad();e.perf.send()}if(document.readyState!=="complete"){if(typeof window.addEventListener==="function"){window.addEventListener("load",h)}else{if(window.attachEvent){window.attachEvent("onload",h)}}}}();
        </script>

        {% script %}
            require(["common:page/layout.js"] , function(app){

            });
        {% endscript %}

        {% block block_head_js %}
        {% endblock %}

        {% block block_head_growingio %}
        <script>
            var _vds = _vds || [];
            window._vds = _vds;
            (function(){
                _vds.push(['setAccountId', '9199126ed94d770d']);
                _vds.push(['setCS1', 'user_id', tplConf.user.userId]);
                (function() {
                    var vds = document.createElement('script');
                    vds.type='text/javascript';
                    vds.async = true;
                    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(vds, s);
                })();
            })();
        </script>
        {% endblock %}

        {% block block_head_zhugeio %}
            {# 诸葛IO统计JS入口 #}
            {% widget "common:widget/zhugeio/zhugeio.tpl" %}
        {% endblock %}

        <script>
            weLogger.init({ platform : 'mo' });
            weLogger.perf.headStart( _jHeadStart );
        </script>
    {% endhead %}

    {% body %}
        <script>
            weLogger.perf.bodyStart( );
        </script>

        <div class="main-content">

            {% block block_body %}
            {% endblock %}

        </div>
        {# 增加调试相关方法 #}
        {% block block_debug %}
            <div>
                {% widget "common:widget/debug/vconsole/vconsole.tpl" %}
            </div>
        {% endblock %}

        {# 页面的JS,放在body结束的入口 #}
        {% block block_body_js %}

        {% endblock %}

        <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?16f9bb97b83369e62ee1386631124bb1";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            (function(a,b,c,d){
                a[c]=function(){a[c]["ar"]=a[c]["ar"]||[];a[c]["ar"].push(arguments);};
                var s=b.createElement("script");s.async = 1;s.src="//t.agrantsem.com/js/agt.js";
                var r=b.getElementsByTagName("script")[0];r.parentNode.insertBefore(s,r);
            })(window,document,"_agtjs","script");
            _agtjs("init","AG_148085_IKDD","we.com");
            _agtjs("trackPv");

            //ga统计
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-93150356-1', 'auto');
            ga('send', 'pageview');
        </script>
        {% script %}
            weLogger.perf.bodyEnd( );
            if( typeof document.addEventListener !== 'function' ){
                weLogger.perf.domReady();
            }
        {% endscript %}
    {% endbody %}

{% endhtml %}
