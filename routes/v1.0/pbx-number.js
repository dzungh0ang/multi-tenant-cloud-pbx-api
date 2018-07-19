import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';

class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.PBX_NUMBER);
        this.updatepbxnumber = this.updatepbxnumber.bind(this);
        this.findpbxnumber = this.findpbxnumber.bind(this);
        this.deletepbxnumber = this.deletepbxnumber.bind(this);
    }
    async updatepbxnumber(request,response){
        let number = {number:request.params?request.params.number : ""};
        let location = request.body.location || "";
        let customer = request.body.customer || "";
        let dialPlan = request.body.dialPlan || "";
        let note = request.body.note || "";
        let result = await this.controller.updatebynumber(number,location,customer,dialPlan,note);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async findpbxnumber(request,response){
        let number = {number:request.params?request.params.number : ""};
        let result = await this.controller.findbynumber(number);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async deletepbxnumber(request,response){
        let number = {number:request.params?request.params.number : ""};
        let result = await this.controller.deletebynumber(number);
        response.status(result.status).json(result.success ? result.data : result);
    }
}

export default new Router();