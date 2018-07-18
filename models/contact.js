/** Model: contact **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    title: { type: String, default: "" },
    fullname: { type: String, default: "" },
    gender: { type: String,enum: ['male','female'], default: "male" },
    address: { type: String, default: "" },
    emails: { type: Object, default: [] },
    phoneNumbers: { type: Object, default: [] },
    note: { type: String, default: "" },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.CUSTOMER },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
module.exports = mongoose.model(MODEL_NAME.CONTACT, schema);