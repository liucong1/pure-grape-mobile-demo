/**
 * Created by wangcheng on 16/3/23.
 */

const Helper = {

    /**
     * 获取元素实际的index
     * @param count
     * @param index
     * @returns {*}
     */
    getActualIndex(count, index){
        if(index >= 0 && index < count){
            return index;
        }else if(index < 0){
            return index + count;
        }else{
            return index - count;
        }
    }

};

module.exports = Helper;