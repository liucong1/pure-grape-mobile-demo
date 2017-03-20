
"use strict";

const ControllerBase = grape.get('controller_base');

class DemoController extends ControllerBase {

    async explainAction(){
        this.http.render('home/page/demo/demo.tpl');
    }
}

module.exports = DemoController;