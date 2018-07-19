import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';

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
        this.updatebynumber = this.updatebynumber.bind(this);
        this.findbynumber = this.findbynumber.bind(this);
    }
    async updatebynumber(number,location,customer,dialPlan,note){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(number){
            result = await this.updateOne(number,{
                location: location,
                customer: customer,
                dialPlan: dialPlan,
                note: note
            });
            if(result.success){
                result.data = {
                    number: result.data.number,
                    location: result.data.location,
                    customer: result.data.customer,
                    dialPlan: result.data.dialPlan,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    async findbynumber(number){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(number){
            result = await this.findOne(number);
            if(result.success){
                result.data = {
                    number: result.data.number,
                    location: result.data.location,
                    customer: result.data.customer,
                    dialPlan: result.data.dialPlan,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    
}

module.exports = new Controller();