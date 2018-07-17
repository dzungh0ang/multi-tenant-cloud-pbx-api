//Version 1.0
import jwt from 'jsonwebtoken';
import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';
import errorCodeHelper from '../../helpers/error-code-helper';
import configs from '../../configs';



class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.AUTO_CALL);
        this.find = this.find.bind(this);
    }
    async find(request,response){
        response.status(200).json(
            {
                phoneNumber: "0912205468",
                pbxNumber: "02471088888",
                callAt: (new Date()),
                duration: 12,
                status: "answered",
                details: {}
            }
        );
    }
}

export default new Router();