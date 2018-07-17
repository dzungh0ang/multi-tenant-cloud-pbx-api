import jwt from 'jsonwebtoken';
import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';
import errorCodeHelper from '../../helpers/error-code-helper';
import configs from '../../configs';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.AUTO_CALL);
    }
}

module.exports = new Controller();