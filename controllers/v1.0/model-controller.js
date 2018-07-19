import DEFAULT_VALUES from "../../enums/default-values";
import ERROR_CODE from "../../enums/error-code"; 
import jsonHelper from "../../helpers/json-helper";
import errorCodeHelper from "../../helpers/error-code-helper";

var models = {
    "user": require('../../models/user'),
    "user-group": require('../../models/user-group'),
    "customer": require('../../models/customer') ,
    "pbx-number": require('../../models/pbx-number') ,
    "pbx": require('../../models/pbx') ,
    "contact": require('../../models/contact') ,
    "dial-plan": require('../../models/dial-plan') ,
}

class ModelController{
    
    constructor(modelName){
        this.modelName = modelName;
        this.Model = models[modelName];
        this.propertiesToPopulate = [];
        this.propertiesShowInList = [];
        this.propertiesShowInDetail = [];

        this.find = this.find.bind(this);
        this.findOne = this.findOne.bind(this);
        this.findOneById = this.findOneById.bind(this);
        this.createOne = this.createOne.bind(this);
        this.updateOneById = this.updateOneById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }
    removeUnwantedProps(obj){
        if(obj){
            if(obj.id){
                obj.id = undefined;
            }
            if(obj._v){
                obj._v = undefined;
            }
        }
        return obj;
    }
    //set query
    getConditions(queries){
        let conditions = {};
        for (let query in queries) {
            if (queries.hasOwnProperty(query)) {
                let value = queries[query];
                if(value !== ""){
                    switch (query) {
                        case "size":
                        case "page":{
        
                            break;
                        }
                        default:{
                            if((query.startsWith("from") || query.startsWith("to")) && query.indexOf("-")>0){
                                let arr = query.split("-");
                                let propertyName = arr[1];
                                if(propertyName){
                                    if(arr === "from"){
                                        conditions[propertyName] = {
                                            $gt: parseInt(value)
                                        }
                                    }else{
                                        conditions[propertyName] = {
                                            $lt: parseInt(value)
                                        }
                                    }
                                    
                                }
                            }else{
                                conditions[query]=value;
                            }
                            
                            break;
                        }
                    }
                }
            }
        }
    
        return conditions;
    }
    //validate create/update item
    validateItem(item){
        let validatedItem = {};
        let Model = this.Model;
        for (const key in item) {
            if (Model.schema.paths.hasOwnProperty(key)) {
                switch (Model.schema.paths[key].instance) {
                    case "Mixed":{
                        validatedItem[key] = jsonHelper.parse(item[key]);
                        break;
                    }
                    default:{
                        validatedItem[key] = item[key];
                        break;
                    }
                        
                }
            }
        }

        return validatedItem;
    }
    //Find items by conditions
    async find(filters){
        let result = errorCodeHelper.getDefaultResult();
        let conditions = this.getConditions(filters);
        let sort = {};
        let pageSize = filters.size === undefined ? DEFAULT_VALUES.QUERY.PAGE_SIZE : parseInt(filters.size);
        let page = filters.page === undefined ? 0 : parseInt(filters.page);
        
        let Model = this.Model;
        let findQuery = Model.find(conditions).limit(pageSize).skip(pageSize*page).sort(sort);
        let countQuery = Model.count(conditions);

        if(this.propertiesToPopulate.length>0){
            this.propertiesToPopulate.forEach(prop => {
                if(prop.name && prop.properties){
                    let populateString = "";
                    if(prop.properties.constructor === Array){
                        populateString = prop.properties.join(" ");
                    }
                    findQuery.populate(prop.name,populateString);
                }
                
            });
        }
        if(this.propertiesShowInList.length>0){
            findQuery.select(this.propertiesShowInList.join(" "));
        }

        try{
            let items = await findQuery.exec();
            let count = await countQuery.exec();
            
            result.success = true;
            result.status = 200;
            result.data = {
                items: items,
                itemCount: count,
                page: page,
                pageSize: pageSize,
                pageCount: Math.ceil(count/pageSize)
            }
        }catch(error){
            result = errorCodeHelper.getErrorResult(error)
        }
        return result;
    }

    //Find one item by conditions
    async findOne(filters){
        let result = errorCodeHelper.getDefaultResult();
        if(filters){
            let findQuery = this.Model.findOne(filters);
            if(this.propertiesToPopulate.length>0){
                this.propertiesToPopulate.forEach(prop => {
                    if(prop.name){
                        let populateString = "";
                        if(prop.properties.constructor === Array){
                            populateString = prop.properties.join(" ");
                        }
                        findQuery.populate(prop.name,populateString);
                    }
                });
            }
            if(this.propertiesShowInDetail.length>0){
                findQuery.select(this.propertiesShowInList.join(" "));
            }
            try{
                let item = await findQuery.exec();
                
                item = this.removeUnwantedProps(item);

                if(item!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = item;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }

    //Find one item by ID
    async findOneById(id){
        let result = errorCodeHelper.getDefaultResult();
        if(id){
            let findQuery = this.Model.findOne({
                _id:id
            });
            if(this.propertiesToPopulate.length>0){
                this.propertiesToPopulate.forEach(prop => {
                    if(prop.name){
                        findQuery.populate(prop.name);
                    }
                });
            }
            if(this.propertiesShowInDetail.length>0){
                findQuery.select(this.propertiesShowInList.join(" "));
            }
            try{
                let item = await findQuery.exec();

                item = this.removeUnwantedProps(item);

                if(item!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = item;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }

    //Create new item
    async createOne(item){
        let result = errorCodeHelper.getDefaultResult();
                
        if(item){
            try{
                let validatedItem = this.validateItem(item);
                let createdItem = await this.Model.create(validatedItem);
                
                createdItem = this.removeUnwantedProps(createdItem);

                result.success = true;
                result.status = 200;
                result.data = createdItem;
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;;
        }

        return result;
    }

    //Update one item
    async updateOne(filters,data){
        let result = errorCodeHelper.getDefaultResult();
        let options = {
            new:true
        };

        if(filters){
            try{
                let validatedData = this.validateItem(data);
                let updatedTtem = await this.Model.findOneAndUpdate(filters,validatedData,options);
                
                updatedTtem = this.removeUnwantedProps(updatedTtem);

                if(updatedTtem!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = updatedTtem;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }

    //Update item by ID
    async updateOneById(id,data){
        let result = errorCodeHelper.getDefaultResult();
        let options = {
            new:true
        };

        if(id){
            try{
                let validatedData = this.validateItem(data);
                let updatedTtem = await this.Model.findByIdAndUpdate(id,validatedData,options);
                
                updatedTtem = this.removeUnwantedProps(updatedTtem);
                if(updatedTtem!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = updatedTtem;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }
    
    //Delete item by ID
    async deleteById(id){
        let result = errorCodeHelper.getDefaultResult();
        if(id){
            let filters = {
                _id: id
            };
            let options = {
                
            }
            try{
                let deletedItem = await this.Model.findOneAndRemove(filters,options);
                
                deletedItem = this.removeUnwantedProps(deletedItem);

                if(deletedItem!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = deletedItem;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }

    //Delete one item
    async deleteOne(filters){
        let result = errorCodeHelper.getDefaultResult();
        if(filters){
            let options = {
                
            }
            try{
                let deletedItem = await this.Model.findOneAndRemove(filters,options);
                
                deletedItem = this.removeUnwantedProps(deletedItem);

                if(deletedItem!=null){
                    result.success = true;
                    result.status = 200;
                    result.data = deletedItem;
                }else{
                    result.success = false;
                    result.error = ERROR_CODE._404_NOT_FOUND._116;
                    result.status = result.error.status;
                }
            }catch(error){
                result = errorCodeHelper.getErrorResult(error);
            }
        }else{
            result.success = false;
            result.error = ERROR_CODE._400_BAD_REQUEST._111;
            result.status = result.error.status;
        }

        return result;
    }
}

export default ModelController;