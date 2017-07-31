/**
 * Created by jess on 16/4/14.
 */


'use strict';

const path = require('path');

const sep = path.sep;
const APP_ROOT = path.dirname( grape.path.APP_PATH );

let development = {
    log : {
        streams : [
            {
                level : 'trace',
                type : 'raw',
                stream : grape.bunyanUtil.stream.dev({
                    depth : 4
                })
            }
        ]
    },

    //后端服务地址配置
    ral : {

    },
    //CMS 文件读取路径配置
    cms_config : {
        data_preview_dir : `${APP_ROOT}${sep}data_preview`,
        data_dir : `${APP_ROOT}${sep}data`,
        article_preview_dir : `${APP_ROOT}${sep}article_preview`,
        article_dir : `${APP_ROOT}${sep}article`,
        page_preview_dir : `${APP_ROOT}${sep}page_preview`,
        page_dir : `${APP_ROOT}${sep}page`
    },

};

//合并公共配置
module.exports = development;
