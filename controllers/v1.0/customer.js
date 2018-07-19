import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';

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
                name:"createdBy",
                properties: 
                [
                    "name",
                    "username"
                ],
            }
        ];
        this.updatebycode = this.updatebycode.bind(this);
        this.findbycode = this.findbycode.bind(this);
        this.deletebycode = this.deletebycode.bind(this);
    }
    async updatebycode(code,name,owner,representative,phoneNumber,email,contract,attributes,note){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(code){
            result = await this.updateOne(code,{
                name: name,
                owner: owner,
                representative: representative,
                phoneNumber: phoneNumber,
                email: email,
                contract: contract,
                attributes: attributes,
                note: note
            });
            if(result.success){
                result.data = {
                    code: result.data.code,
                    name:result.data.name,
                    owner: result.data.owner,
                    representative: result.data.representative,
                    phoneNumber: result.data.phoneNumber,
                    email: result.data.email,
                    contract: result.data.contract,
                    attributes: result.data.attributes,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    async findbycode(code){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(code){
            result = await this.findOne(code);
            if(result.success){
                result.data = {
                    code: result.data.code,
                    owner: result.data.owner,
                    representative: result.data.representative,
                    phoneNumber: result.data.phoneNumber,
                    email: result.data.email,
                    contract: result.data.contract,
                    attributes: result.data.attributes,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    async deletebycode(code){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(code){
            result = await this.deleteOne(code);
            if(result.success){
                console.log(result);
            }
        }
        return result;
    }

}

module.exports = new Controller();