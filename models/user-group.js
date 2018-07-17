/** Model: user-group **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 40, default: "" },
    active: { type: Boolean, default: false },
    menuItems: { type: Object,default:[] },
    permissions: { type: Object,default:[] },
    attributes: { type: Object,default:[] },
    note: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.USER, required:false, default:undefined }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});
schema.index({
    name: 'text'
})
module.exports = mongoose.model(MODEL_NAME.USER_GROUP, schema);