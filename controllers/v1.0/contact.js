import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.CONTACT);
        this.propertiesShowInList = [
            "title",
            "fullname",
            "gender",
            "address",
            "emails",
            "phoneNumbers",
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