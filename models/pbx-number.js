/** Model: pbx-number **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    number: { type: String, required: true, unique: true, default: "" },
    location: { type: String, required: true, default: "" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.CUSTOMER },
    dialPlan: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.DialPlan },
    attributes: { type: Object, default: {} },
    note: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.PBX_NUMBER, schema);