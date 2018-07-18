/** Model: customer **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, default: "" },
    name: { type: String, required: true, default: "" },
    owner: { type: String, required: true, default: (new Date()) },
    representative: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    email: { type: String, default: "" },
    contract: { type: Object, default: {} },
    attributes: { type: Object, default: {} },
    note: { type: String, default: "" },
    attributes: { type: Object, default: {} },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.CUSTOMER, schema);