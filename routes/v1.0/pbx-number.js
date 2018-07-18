import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';

class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.PBX_NUMBER);
    }
}

export default new Router();