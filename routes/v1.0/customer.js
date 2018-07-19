import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';

class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.CUSTOMER);
        this.updatecustomer = this.updatecustomer.bind(this);
        this.findcustomer = this.findcustomer.bind(this);
        this.deletecustomer = this.deletecustomer.bind(this);
    }
    async updatecustomer(request,response){
        let code = {code:request.params?request.params.code : ""};
        let name = request.body.name || "";
        let owner = request.body.owner || "";
        let representative = request.body.representative || "";
        let phoneNumber = request.body.phoneNumber || "";
        let email = request.body.email || "";
        let contract = request.body.contract || "";
        let attributes = request.body.attributes || "";
        let note = request.body.note || "";
        let result = await this.controller.updatebycode(code,name,owner,representative,phoneNumber,email,contract,attributes,note);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async findcustomer(request,response){
        let code = {code:request.params?request.params.code : ""};
        let result = await this.controller.findbycode(code);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async deletecustomer(request,response){
        let code = {code:request.params?request.params.code : ""};
        let result = await this.controller.deletebycode(code);
        response.status(result.status).json(result.success ? result.data : result);
    }
}

export default new Router();