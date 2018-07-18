import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.CUSTOMER);
        this.propertiesShowInList = [
            "code",
            "name",
            "owner",
            "representative",
            "phoneNumber",
            "email",
            "contract",
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