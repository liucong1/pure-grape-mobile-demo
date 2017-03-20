/**
 * 禁止某个接口的访问
 * Created by jess on 16/5/5.
 */

'use strict';

const PolicyBase = grape.get('policy_base');


class RequestDenyPolicy extends PolicyBase {

    async execute(extraData){

        this.http.sendStatus(403);

        return grape.prevent();

    }
}


module.exports = RequestDenyPolicy;