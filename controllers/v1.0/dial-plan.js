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
                    name:"customer",
                    properties: 
                    [
                        "name",
                        "code"
                    ],
                },
                {
                    name:"createdBy",
                    properties: 
                    [
                        "name",
                        "username"
                    ],
                }
            
        ];
    }
}

module.exports = new Controller();