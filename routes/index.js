import {Router} from 'express';
import v1_0 from './v1.0';

var router = Router();
router.use("/v1.0",v1_0);
router.use('/',(req,res)=>{
    var result = {
        name:"API System"
    };
    res.json(result);
});

export default router;