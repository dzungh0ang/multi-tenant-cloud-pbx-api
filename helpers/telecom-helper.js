const PHONE_NUMBER_REGEXP = /^0[1-9][0-9]{6,9}$/;
const MOBILE_NUMBER_REGEXP = /^0[19][0-9]{8,9}$/;
const SIP_ACCOUNT_REGEXP = /^[a-zA-Z0-9]{3,8}$/;

module.exports = {
    isMobileNumber:function(input) {
        return MOBILE_NUMBER_REGEXP.test(input);
    },
    isPhoneNumber:function(input) {
        return PHONE_NUMBER_REGEXP.test(input);
    },
    isSipAccount:function(input) {
        return SIP_ACCOUNT_REGEXP.test(input);
    },
    removeVNCountryCode: function(phoneNumber){
        if(phoneNumber.indexOf("84")===0){
            phoneNumber = "0"+phoneNumber.substring(2);
        }
        if(phoneNumber.indexOf("0")!==0){
            phoneNumber = "0"+phoneNumber;
        }

        return phoneNumber;
    }
}