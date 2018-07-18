/** Model: dial-plan **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    name: { type: String, default: "" },
    welcomeAudio: { type: String, default: "" },
    wrongDigitAudio: { type: String, default: "" },
    extensions: { type: Object, default: [] },
    attributes: { type: Object, default: [] },
    note: { type: String, default: "" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.CUSTOMER  },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.DIAL_PLAN, schema);