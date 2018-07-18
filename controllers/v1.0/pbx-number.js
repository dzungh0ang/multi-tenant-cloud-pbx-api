import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.PBX_NUMBER);
        this.propertiesShowInList = [
            "number",
            "location",
            "customer",
            "dialPlan",
            "note"
        ]
        this.propertiesToPopulate = [
            {
                name:"createdBy"
            }
        ];
    }
}

module.exports = new Controller();