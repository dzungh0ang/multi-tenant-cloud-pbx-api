module.exports = {
    isJSONString:function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    parse:function(str){
        let jsonObject = undefined;
         try {
            jsonObject = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return jsonObject;
    }
}