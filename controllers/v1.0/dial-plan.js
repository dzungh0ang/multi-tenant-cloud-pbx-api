import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.DIAL_PLAN);
        this.propertiesShowInList = [
            "name",
            "welcomeAudio",
            "wrongDigitAudio",
            "extensions",
            "note"
        ]
        this.propertiesToPopulate = [
            {
                customer:"customer",
                name:"createdBy"
            }
        ];
    }
}

module.exports = new Controller();