//Version 1.0
import {Router} from 'express';

import jwt from 'jsonwebtoken';
import auth from 'basic-auth';
import ERROR_CODE from '../../enums/error-code';
import configs from '../../configs';

import userRouter from './user';
import groupRouter from './user-group';
import customer from './customer';
import pbx_number from './pbx-number';
import pbx from './pbx';
import contact from './contact';
import dial_plan from './dial-plan';
import autoCall from './auto-call';


var router = Router();



router.get('/',(request,response)=>{
    let result = {
        name:"API System",
        version:"v1.0"
    };
    response.json(result);
});

router.use(async (request, response, next) => {
    let userInfo = auth(request);
    let authToken = request.cookies["auth-token"] || "";
    let user = undefined;
    let userController = require("../../controllers/v1.0/user");
    let isAuthenticated = false;
    let isAuthoized = false;
    let errorCode = undefined;
    let allowPaths = [
        "/user/login"
    ];

    // Website you wish to allow to connect
    response.setHeader('Access-Control-Allow-Origin', process.env.ACAO || '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Access-Token, X-Api-Key');
    response.setHeader('Access-Control-Allow-Credentials', true);

    if(request.method === "OPTIONS"){
        return response.status(200).json({
            success: true
        })
    }
    if (allowPaths.indexOf(request.path.toLowerCase())>=0) {
        
        request.account = undefined;
        return next();
    }

    if(userInfo){
        if(userInfo.name!=="" && userInfo.pass!==""){
            let result = await userController.findOne({
                _id: userInfo.name,
                authToken: userInfo.pass
            });
            if(result.success){
                user = result.data;
            }
        }
    } 
    if(authToken!==""){
        let jwtData = undefined;
        try {
            jwtData = await jwt.verify(authToken, configs.jwt.secret);    
        } catch (error) {
            
        }
        
        if(jwtData){
            if(jwtData.ip === request.ip && jwtData.userAgent === request.headers["user-agent"]){
                let result = await userController.findOne({
                    _id: jwtData.id
                });
                if(result.success){
                    user = result.data;
                }
            }
        }
    }
    
    if(user){
        isAuthenticated = true;
        errorCode = ERROR_CODE._403_FORBIDEN._106;
        if(user.group){
            if(user.group.permissions){
                let found = user.group.permissions.find(p=>{
                    let pathRegex = new RegExp(p.path);
                    let methodRegex = new RegExp(p.method);
                    return pathRegex.test(request.path) && methodRegex.test(request.method.toUpperCase()) ;
                });
                
                if(found){
                    isAuthoized = true;
                }
            }
        }
    }

    if(isAuthenticated){
        if(isAuthoized){
            request.user = user;
            return next();
        }else{
            errorCode = ERROR_CODE._403_FORBIDEN._106;
        }
    }else{
        errorCode = ERROR_CODE._401_UNAUTHORIZED._100;
    }
    response.status(errorCode.status).json(errorCode);
});

//user
router.get('/user',userRouter.find);
router.post('/user/login',userRouter.login);
router.post('/user/update-profile',userRouter.udateProfile);
router.post('/user/change-password',userRouter.changePassword);
router.get('/user/:id',userRouter.findOneById);
router.post('/user',userRouter.createOne);
router.put('/user/:id',userRouter.updateOneById);
router.delete('/user/:id',userRouter.deleteById);

router.get('/user-group',groupRouter.find);
router.get('/user-group/:id',groupRouter.findOneById);
router.post('/user-group',groupRouter.createOne);
router.put('/user-group/:id',groupRouter.updateOneById);
router.delete('/user-group/:id',groupRouter.deleteById);

//customer
router.get('/customer',customer.find);
router.get('/customer/:id',customer.findOneById);
router.post('/customer',customer.createOne);
router.put('/customer/:id',customer.updateOneById);
router.delete('/customer/:id',customer.deleteById);

//pbx-number
router.get('/pbx-number',pbx_number.find);
router.get('/pbx-number/:number',pbx_number.findpbxnumber);
router.post('/pbx-number',pbx_number.createOne);
router.put('/pbx-number/:number',pbx_number.updatepbxnumber);
router.delete('/pbx-number/:id',pbx_number.deleteById);

//pbx
router.get('/pbx',pbx.find);
router.get('/pbx/:id',pbx.findOneById);
router.post('/pbx',pbx.createOne);
router.put('/pbx/:id',pbx.updateOneById);
router.delete('/pbx/:id',pbx.deleteById);

//contact
router.get('/contact',contact.find);
router.get('/contact/:id',contact.findOneById);
router.post('/contact',contact.createOne);
router.put('/contact/:id',contact.updateOneById);
router.delete('/contact/:id',contact.deleteById);

//dial-plan
router.get('/dial-plan',dial_plan.find);
router.get('/dial-plan/:id',dial_plan.findOneById);
router.post('/dial-plan',dial_plan.createOne);
router.put('/dial-plan/:id',dial_plan.updateOneById);
router.delete('/dial-plan/:id',dial_plan.deleteById);

router.get('/auto-call',autoCall.find);

router.use(function (err, req, res, next) {
    logger.error(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});
export default router;