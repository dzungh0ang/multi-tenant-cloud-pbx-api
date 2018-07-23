const LIST = {
    _401_UNAUTHORIZED:{
        _100:{
            code: 100,
            message: "Your Authentication is incorrect.",
            status: 401,
            detail: ""
        }
    },
    _400_BAD_REQUEST:{
        _111:{
            code: 111,
            message: "Validation failed.",
            status: 400,
            detail: ""
        },
        _112:{
            code: 112,
            message: "Invalid username password",
            status: 400,
            detail: ""
        },
        _113:{
            code: 113,
            message: "Invalid current password",
            status: 400,
            detail: ""
        }
    },
    _403_FORBIDEN:{
        _106:{
            code: 106,
            message: "You are not allowed to perform this request.",
            status: 403,
            detail: ""
        }
    },
    _404_NOT_FOUND:{
        _116:{
            code: 116,
            message: "Your requested resource not found.",
            status: 404,
            detail: ""
        }
    },
    _405_METHOD_NOT_ALLOWED:{
        _121:{
            code: 121,
            message: "Current API does not support this HTTP Method.",
            status: 405,
            detail: ""
        }
    },
    _500_INTERNAL_SERVER_ERROR:{
        _126:{
            code: 126,
            message: "Server Error, your request is not completed.",
            status: 500,
            detail: ""
        }
    },
    mysql:{
        connection_failed:{
            code:"400",
            message:"Connection Failed!"
        },
        not_found:{
            code:"200",
            message:"Không tìm thấy thông tin!"
        },
        success:{
            code:"0",
            message:"Success!"
        },
        failed:{
            code:"300",
            message:"Failed!"
        },
        create_failed:{
            code:"202",
            message:"Tạo mới thất bại!"
        },
        update_failed:{
            code:"203",
            message:"Cập nhật thất bại!"
        },
        delete_failed:{
            code:"204",
            message:"Xóa thất bại!"
        }
    },
    other:{
        success:{
            code:"200",
            message:"Success"
        }
    }
}

export default LIST;