import socketio from 'socket.io';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import userController from '../controllers/v1.0/user';

async function getuser(authToken,ip){
    let jwtData = await jwt.verify(authToken, configs.jwt.secret);
        
    if(jwtData.ip === ip){
        let result = await userController.findOne({
            _id: jwtData.id
        });
        if(result.success){
            if(result.data !== null){
                return result.data;
            }
        }
    }
    return undefined;
}

module.exports.listen = (app)=>{
    var io = socketio.listen(app);
    io.on('connection',socket=>{
        console.log('[socketio - connect] address:',socket.handshake.address,', id:',socket.id);
    });
    io.on('disconnection',socket=>{
        console.log('[socketio - connect] address:',socket.handshake.address,', id:',socket.id);
    });

    return io;
}