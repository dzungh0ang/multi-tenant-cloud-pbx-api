//Version 1.0
import jwt from 'jsonwebtoken';
import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';
import errorCodeHelper from '../../helpers/error-code-helper';
import configs from '../../configs';



class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.USER);
        this.login = this.login.bind(this);
        this.udateProfile = this.udateProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    async login(request,response){
        let username = request.body.username || "";
        let password = request.body.password || "";
        let ip = request.ip;
        let userAgent = request.headers["user-agent"];
        let result = await this.controller.login(username,password,ip,userAgent);

        if(result.success){
            response.cookie("auth-token",result.data.authToken,{
                expires: new Date(Date.now() + result.data.timeout),
                httpOnly: true
            });
        }

        response.status(result.status).json(result.success ? result.data : result);
    }
    async udateProfile(request,response){
        let id = request.user?request.user._id : "";
        let name = request.body.name || "";
        let email = request.body.email || "";
        let phoneNumber = request.body.phoneNumber || "";
        let address = request.body.address || "";
        let result = await this.controller.updateProfile(id,name,email,phoneNumber,address);
        
        response.status(result.status).json(result.success ? result.data : result);
    }
    async changePassword(request,response){
        let id = request.user?request.user._id : "";
        let currentPassword = request.body.currentPassword || "";
        let newPassword = request.body.newPassword || "";

        let result = await this.controller.changePassword(id,currentPassword,newPassword);
        
        response.status(result.status).json(result.success ? result.data : result);
    }
}

export default new Router();