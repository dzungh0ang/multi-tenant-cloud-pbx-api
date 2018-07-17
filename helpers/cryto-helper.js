var crypto = require('crypto');
const ALGORITHM ={
    AES_256_CTR: 'aes-256-ctr'
};

module.exports = {
    genarateId(length=8){
        return crypto.randomBytes(length).toString("hex");
    },
    encryptAES256(plainText,password){
        var cipher = crypto.createCipher(ALGORITHM.AES_256_CTR,password)
        var crypted = cipher.update(plainText,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    decryptAES256(encryptedText,password){
        var plainText = "";
        try {
            var decipher = crypto.createDecipher(ALGORITHM.AES_256_CTR,password)
            var dec = decipher.update(encryptedText,'hex','utf8')
            dec += decipher.final('utf8');
            plainText = dec;
        } catch (error) {
            plainText = "";
        }
        return plainText;
    }
}