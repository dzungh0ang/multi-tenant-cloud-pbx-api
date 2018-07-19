import ModelController from "./model-controller";
import MODEL_NAME from '../../enums/model-name';
import ERROR_CODE from '../../enums/error-code';

class Controller extends ModelController{
    constructor(){
        super(MODEL_NAME.PBX);
        this.propertiesShowInList = [
            "hostname",
            "type",
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
        this.updatebyhostname = this.updatebyhostname.bind(this);
        this.findbyhostname = this.findbyhostname.bind(this);
        this.deletebyhostname = this.deletebyhostname.bind(this);
    }
    async updatebyhostname(hostname,type,attributes,note){
        let result = ERROR_CODE._403_FORBIDEN._106;
        console.log(hostname);
        if(hostname){
            result = await this.updateOne(hostname,{
                type: type,
                attributes: attributes,
                note: note
            });
            if(result.success){
                result.data = {
                    hostname: result.data.hostname,
                    type: result.data.type,
                    attributes: result.data.attributes,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    async findbyhostname(hostname){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(hostname){
            result = await this.findOne(hostname);
            if(result.success){
                result.data = {
                    hostname: result.data.hostname,
                    type: result.data.type,
                    attributes: result.data.attributes,
                    note: result.data.note
                }
            }
        }
        return result;
    }
    async deletebyhostname(hostname){
        let result = ERROR_CODE._403_FORBIDEN._106;
        if(hostname){
            result = await this.deleteOne(hostname);
        }
        return result;
    }
}

module.exports = new Controller();