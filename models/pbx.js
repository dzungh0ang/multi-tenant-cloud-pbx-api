/** Model: pbx **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    hostname: { type: String, required: true, unique: true, default: "" },
    type: { type: String, required: true,enum: ['asterisk', 'freeswitch'], default: "" },
    attributes: { type: Object, default: {} },
    note: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.PBX, schema);