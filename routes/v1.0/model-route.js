class ModelRoute {

    constructor(controllerName){
        var controller = require('../../controllers/v1.0/'+controllerName);
        this.controllerName = controllerName;
        this.controller = controller;
        
        this.find = this.find.bind(this);
        this.findOneById = this.findOneById.bind(this);
        this.createOne = this.createOne.bind(this);
        this.updateOneById = this.updateOneById.bind(this);
        this.deleteById = this.deleteById.bind(this);

    }
    async find(request,response) {
        let result = await this.controller.find(request.query);
        
        response.status(result.status).json(result.success ? result.data : result.error);
    }
    async findOneById(request,response) {
        let result = await this.controller.findOneById(request.params.id);
        response.status(result.status).json(result.success ? result.data : result.error);
    }
    async createOne(request,response) {
        let result = await this.controller.createOne(request.body);
        response.status(result.status).json(result.success ? result.data : result.error);
    }
    async updateOneById(request,response) {
        let result = await this.controller.updateOneById(request.params.id,request.body);
        response.status(result.status).json(result.success ? result.data : result.error);
    }
    async deleteById(request,response) {
        let result = await this.controller.deleteById(request.params.id);
        response.status(result.status).json(result.success ? result.data : result.error);
    }
}

export default ModelRoute;