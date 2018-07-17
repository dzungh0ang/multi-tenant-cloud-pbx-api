/** Model: user-group **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, default: "" },
    pbxNumber: { type: String, required: true, default: "" },
    callAt: { type: Date, required: true, default: (new Date()) },
    duration: { type: String, required: true, default: 0 },
    status: { type: String, required: true, default: 0 },
    details: { type: Object, required: true, default: {} }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.AUTO_CALL, schema);