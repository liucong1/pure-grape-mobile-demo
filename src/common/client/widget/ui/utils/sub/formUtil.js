/**
 * form 表单验证
 */


'use strict';
var $ = require('common:widget/lib/jquery/jquery.js');

var ErrMsg = {
    emptyLogin: '不能为空',
    PwdLength: '密码长度需为6-16个字符之间',
    equalPwd: '您输入的两次密码不一致',
    emptynamepass: '昵称或密码不能为空',
    isRandCode: '请输入正确的手机验证码',
    isMobile: '请输入正确的手机号码',
    isMobileOrEmail: '请输入正确的邮箱地址或手机号码',
    isNickName: '昵称只能由中文、英文字母、数字、下划线组成',
    isNickNameLength: '昵称长度需为4-16字符之间',
    isPassword: '密码包含非法字符',
    isPassNotAllNum: '密码不能全为数字',
    isPassNotRepeat: '密码不能为同一个字符'
            
}; 
var utils = {
    msg: function(str) {
        alert(str);
    },
    checkMobile: function(el) {
        if (!this.isMobile(el.val())) {
            this.msg(ErrMsg.isMobile);
            return false;
        }
        return true;
    },
    checkRandCode: function(el) {
        var val;
        val = el.val();
        if (!val || val.length < 1 || val.length > 10) {
            this.msg(ErrMsg.isRandCode);
            return false;
        }
        return true;
    },
    checkNamePass: function($name, $pwd){
        var _bValid = true;
        if( $name.val().length > 0 && $pwd.val().length > 0){
            _bValid = true;
        }else{
            _bValid = false;
            this.msg(ErrMsg.emptynamepass);
        }
        return _bValid;
    },
    checkUserName: function(el,n) {
        var byteLen, val;
        val = el.val();
        byteLen = this.getByteLength(val);
        if (byteLen<1) {
            
        this.msg([n,ErrMsg.emptyLogin].join(''));
        return false;
        }
        return true;
    },
    checkPassWord: function(el) {
        var val;
        val = el.val();
        if (!this.isLength(val, 6, 16)) {
        this.msg(ErrMsg.PwdLength);
        return false;
        }
        /*if (!this.isPassNotAllNum(val)) {
        this.msg(ErrMsg.isPassNotAllNum);
        return false;
        }
        if (!this.isPassNotRepeat(val)) {
        this.msg(ErrMsg.isPassNotRepeat);
        return false;
        }*/
        if (!this.isPassWord(val)) {
        this.msg(ErrMsg.isPassword);
        return false;
        }
        return true;
    },
    checkMaxLength: function(el, n, max) {
        var val;
        val = el.val();
        if (val.length > max) {
        this.msg([n, '长度为不能超过',  max, '个字符'].join(''));
        return false;
        }
        return true;
    }, 
    checkLength: function(el, n, min, max) {
        var val;
        val = el.val();
        if (val.length > max || val.length < min) {
        this.msg([n, '长度为', min, '-', max, '之间'].join(''));
        return false;
        }
        return true;
    },
    checkRegexp: function(el, regexp, n) {
        if (!regexp.test(el.val())) {
        this.msg(['请输入正确的', n].join(''));
        return false;
        }
        return true;
    },
    getByteLength: function(source) {
        return String(source).replace(/[^\x00-\xff]/g, "ci").length;
    },
    isLength: function(x, min, max) {
        return x.length >= min && x.length <= max;
    },
    isPassWord: function(x) {
        return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{1,}$/.test(x);
    },
    isPassNotAllNum: function(x) {
        return !/^\d{1,}$/.test(x);
    },
    isPassNotRepeat: function(x) {
        return !/^(.)\1+$/.test(x);
    },
    isNickName: function(x) {
        return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(x);
    },
    isMobile: function(x) {
        return /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(x);
    }	
};
 

module.exports = utils;