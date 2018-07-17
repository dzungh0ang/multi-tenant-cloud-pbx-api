/** Model: user **/
import mongoose,{Schema}  from 'mongoose';
import MODEL_NAME from '../enums/model-name';

var schema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true, unique: true, match: /^[.a-zA-Z0-9-]{3,20}$/, minlength: 3, maxlength: 20, default: "" },
    password: { type: String, required: true, minlength: 6, maxlength: 20, default: "" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAME.USER_GROUP, default:undefined,  required:false },
    active: { type: Boolean, default: true },
    attributes: { type: Object,default:{} },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    onlineAt: { type: Date, default: Date.now()},
    authToken: { type: String, default: "", match: /^([a-zA-Z0-9]{30})*$/ },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default:undefined, ref: MODEL_NAME.USER }
},{ 
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
schema.virtual('isOnline').get(function () {
    let result = false;
    if(this.onlineAt){
        result = (this.onlineAt.getTime() - (new Date()).getTime())>0;
    }
    return result;
});
schema.index({
    username: 'text',
    name: 'text',
    phoneNumber: 'text',
    email: 'text'
})
module.exports = mongoose.model(MODEL_NAME.USER, schema);