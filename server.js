import mongoose from 'mongoose';
import logger from 'morgan';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './configs';
import route from './routes';


var io = undefined;
var app = express();
var server =  undefined;
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongodb,
    {

    }
).then(() =>  console.log('MongoDB connection succesfully!')).catch((err) => console.error(err));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(route);


server = http.createServer(app);
io = require('./socket/index').listen(server);
server.listen(port);

server.on('listening', () => {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('API server started on port ' + bind);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
})