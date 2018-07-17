import jwt from 'jsonwebtoken';
import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';
import errorCodeHelper from '../../helpers/error-code-helper';
import configs from '../../configs';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.USER);
        this.propertiesShowInList = [
            "_id",
            "username",
            "name",
            "email",
            "phoneNumber",
            "address",
            "active",
            "onlineAt",
            "isOnline",
            "createdBy"
        ];
        this.propertiesShowInDetail = [
            "_id",
            "username",
            "name",
            "email",
            "phoneNumber",
            "address",
            "active",
            "onlineAt",
            "isOnline",
            "createdBy"
        ];
        this.propertiesToPopulate = [
            {
                name:"group",
                properties: 
                [
                    "name",
                    "permissions"
                ],
            },
            {
                name:"createdBy",
                properties: 
                [
                    "name",
                    "username"
                ],
            }
        ];
        this.updateOnlineTime = this.updateOnlineTime.bind(this);
        this.login = this.login.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    async updateOnlineTime(id){
        let result = errorCodeHelper.getDefaultResult();
        let options = {
            new:true
        };

        if(id){
            try{
                let updatedItem = await this.Model.findByIdAndUpdate(id,{onlineAt: new Date(Date.now()+10000)},options);
                
                result.success = true;
                result.status = 200;
                result.data = updatedItem.onlineAt;
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }
        return result;
    }
    async login(username="",password="",ip="",userAgent=""){
        let result = errorCodeHelper.getDefaultResult();
        let foundUserResult = undefined;
        if(username!=="" && password!==""){
            let foundUserResult = await this.findOne({
                username:username,
                password:password
            });
            if(foundUserResult.success){
                if(foundUserResult.data!==null)
                {
                    let jwtData = {
                        id: foundUserResult.data._id,
                        ip: ip,
                        userAgent: userAgent
                    };
                    let token = jwt.sign(
                        jwtData,
                        configs.jwt.secret,
                        {
                            expiresIn: configs.jwt.timeout
                        }
                    );
                    result.success = true;
                    result.status = 200;
                    result.data ={
                        authToken : token,
                        timeout : configs.cookies.timeout,
                        user: {
                            _id: foundUserResult.data._id,
                            username: foundUserResult.data.username,
                            name: foundUserResult.data.name
                        }
                    };
                    return result;
                }
            }
        }
        result = ERROR_CODE._400_BAD_REQUEST._112;
        return result;
    }
    async updateProfile(id,name,email,phoneNumber,address){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(id){
            result = await this.updateOneById(id,{
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                address: address
            });
            if(result.success){
                result.data = {
                    _id: id,
                    name: result.data.name,
                    email: result.data.email,
                    phoneNumber: result.data.phoneNumber,
                    address: result.data.address
                }
            }
        }
        return result;
    }
    async changePassword(id,currentPassword,newPassword){
        let result = ERROR_CODE._400_BAD_REQUEST._113;
        if(id){
            if(currentPassword!=="" && currentPassword === newPassword){
                result = await this.updateOne({
                    _id: id,
                    password: currentPassword
                },{
                    password: newPassword
                });

                if(result.success){
                    result.data = {
                        _id: id
                    }
                }
            }
        }
        return result;
    }
}

module.exports = new Controller();