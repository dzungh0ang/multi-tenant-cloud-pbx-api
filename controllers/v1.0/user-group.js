import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.USER_GROUP);
        this.propertiesShowInList = [
            "name",
            "active",
            "note",
            "createdBy"
        ]
        this.propertiesToPopulate = [
            {
                name:"createdBy",
                properties:[
                    "name",
                    "username"
                ]
            }
        ];
    }
}

module.exports = new Controller();