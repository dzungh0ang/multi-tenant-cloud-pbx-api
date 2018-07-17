import ERROR_CODE from '../enums/error-code';

module.exports = {
    getDefaultResult:()=>{
        return {
            success: false,
            status: 500,
            error: undefined,
            data: undefined
        }
    },
    getErrorResult:(error)=>{
        let errorCode = ERROR_CODE._500_INTERNAL_SERVER_ERROR._126;
        var result = {};
        switch (error.name) {
            case "CastError":{
                switch (error.kind) {
                    case "ObjectId":{
                        errorCode = ERROR_CODE._400_BAD_REQUEST._111;
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
            case "ValidationError":{
                errorCode = ERROR_CODE._400_BAD_REQUEST._111;
                break;
            }
            case "BulkWriteError":{
                errorCode = ERROR_CODE._400_BAD_REQUEST._111;
            }
            default:
                break;
        }
        if(process.env.NODE_ENV !== "production"){
            errorCode.stack = error.stack;
        }
        result = {
            success:false,
            status: errorCode.status,
            error: errorCode
        }
        return result;
    }
}