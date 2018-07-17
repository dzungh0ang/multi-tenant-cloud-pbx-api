import localhost from './localhost';
import development from './development';
import production from './production';

var config = undefined;

switch (process.env.NODE_ENV) {
    default:
    case "localhost":{
        config = localhost;
        break;
    }
    case "development":{
        config = development;
        break;
    }
    case "production":{
        config = production;
        break;
    }
}

export default config;