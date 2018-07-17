const LIST = {
    INDEX:{
        success:true,
        code:"success",
        message:"API v1.0"
    },
    SUCCESS: {
        success:true,
        code:"success",
        message:"Thực hiện thành công"
    },
    FAILED: {
        success:false,
        code:"failed",
        message:"Thực hiện thất bại"
    },
    INTERNAL_ERROR: {
        success:false,
        code:"internal-error",
        message:"Lỗi hệ thống"
    },
    UNAUTHORIZED_REQUEST:{
        success:false,
        code:"unauthorized-request",
        message:"Request không được phép thực hiện"
    },
    UNAUTHORIZED_IP: {
        success:false,
        code:"unauthorized-ip",
        message:"IP không được phép thực hiện"
    },
    /** QUERY **/
    QUERY:{
        SUCCESS: {
            success:true,
            code:"query-success",
            message:"Truy vấn thành công"
        },
        FAILED: {
            success:false,
            code:"query-failed",
            message:"Truy vấn thất bại"
        },
        INVALID_ID:{
            success:false,
            code:"invalid-id",
            message:"Tham số id không hợp lệ"
        }
    },
    CRUD:{
        /** CREATE ITEM **/
        CREATE_SUCCESS:{
            success:true,
            code:"create-success",
            message:"Tạo mới thành công"
        },
        CREATE_FAILED:{
            success:false,
            code:"create-failed",
            message:"Tạo mới thất bại"
        },
        /** UPDATE ITEM **/
        UPDATE_SUCCESS:{
            success:true,
            code:"update-success",
            message:"Cập nhật thành công"
        },
        UPDATE_FAILED:{
            success:false,
            code:"update-failed",
            message:"Cập nhật thất bại"
        },
        /** DELETE ITEM **/
        DELETE_SUCCESS:{
            success:true,
            code:"delete-success",
            message:"Xóa thành công"
        },
        DELETE_FAILED:{
            success:false,
            code:"delete-failed",
            message:"Xóa thất bại"
        }
    },
    user:{
        /** LOGIN **/
        LOGIN_SUCCESS: {
            success:true,
            code:"login-success",
            message:"Đăng nhập thành công"
        },
        LOGIN_FAILED: {
            success:false,
            code:"login-failed",
            message:"Đăng nhập thất bại"
        },
        LOGIN_INVALID_USER: {
            success:false,
            code:"invalid-user",
            message:"Sai thông tin tài khoản"
        },
        INVALID_API_KEY: {
            success:false,
            code:"invalid-api-key",
            message:"Sai API Key"
        }
        ,
        INVALID_TOKEN: {
            success:false,
            code:"invalid-token",
            message:"Sai Token Key"
        }
    }
}

export default LIST;