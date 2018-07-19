import BaseRouter from "./model-route.js";
import MODEL_NAME from '../../enums/model-name';

class Router extends BaseRouter{
    constructor(){
        super(MODEL_NAME.PBX);
        this.updatepbx = this.updatepbx.bind(this);
        this.findpbx = this.findpbx.bind(this);
        this.deletepbx = this.deletepbx.bind(this);
    }
    async updatepbx(request,response){
        let hostname = {hostname:request.params?request.params.hostname : ""};
        let type = request.body.type || "";
        let attributes = request.body.attributes || "";
        let note = request.body.note || "";
        let result = await this.controller.updatebyhostname(hostname,type,attributes,note);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async findpbx(request,response){
        let hostname = {hostname:request.params?request.params.hostname : ""};
        let result = await this.controller.findbyhostname(hostname);
        response.status(result.status).json(result.success ? result.data : result);
    }
    async deletepbx(request,response){
        let hostname = {hostname:request.params?request.params.hostname : ""};
        let result = await this.controller.deletebyhostname(hostname);
        response.status(result.status).json(result.success ? result.data : result);
    }
}

export default new Router();