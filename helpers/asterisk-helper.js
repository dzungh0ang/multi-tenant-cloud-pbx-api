var configs = require("../configs");
var ami = new require("asterisk-manager")(configs.ami.port, configs.ami.host, configs.ami.username, configs.ami.secret, true);

module.exports = { 
    getChannels:function(req, res, next){
        ami.action({
        "action":"CoreShowChannels",
        "ActionID":"1231"
        }, function(err, result) {
            console.log(result);
            res.json({
                success:err!=undefined,
                code: 0,
                message: "success",
                data: undefined
            });
        });
    },
    getPeers:function(req, res, next){
        ami.action({
        "action":"SIPpeers",
        "ActionID":"1231"
        }, function(err, result) {
            console.log(result);
            res.json({
                success:err!=undefined,
                code: 0,
                message: "success",
                data: undefined
            });
        });
    },
    originateCall:function (
        trunk,
        extension,
        context,
        callerID,
        variables,
        callback
    ) {
        var action = {
            "action":"originate",
            "channel":`SIP/${trunk}`,
            "context":context,
            "exten": extension,
            "callerID": callerID,
            "priority":1,
            "variable":""
        };
        for (var key in variables) {
            if (variables.hasOwnProperty(key)) {
                var value = variables[key];
                action.variable += `${key}=${value},`;
            }
        }
        ami.action(action, function(err, result) {
            callback(err,result);
        });
    },
    spy:function (req, res, next) {
        let source = req.user.sip;
        let sip = req.params.sip;
        let mode = req.params.mode;

        switch (mode) {
            default:
            case "spy":
            {
                mode = "q";
                break;
            }
            case "whisper":
            {
                mode = "qw";
                break;
            }
            case "private_whisper":
            {
                mode = "qW";
                break;
            }

            
        }
        if(source){
            ami.action({
                "action":"originate",
                "channel":`SIP/${source}`,
                "context":"spy",
                "exten": sip,
                "callerID": `Jupviec CallCenter`,
                "priority":1,
                "variable":`SPY_MODE=${mode}`
            }, function(err, result) {
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
            return res.json({
                success:true,
                code:"000",
                message:"Thực hiện cuộc gọi giám sát thành công, vui lòng nhấc ip phone/soft phoen của bạn để bắt đầu nghe giám sát trên extension "+sip
            });
        }else{
            return res.json({
                success:false,
                code:"001",
                message:"Tài khoản của bạn chưa được cấp Sip user!"
            });
        }
        
    }
}