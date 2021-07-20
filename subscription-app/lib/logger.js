const app = require('./package').name;

//using facade to hide logging method and exporting INFO, ERROR and DEBUG methods
const Logging = (issueType, filename, method, desc) => {
    let logData = {
        host: process.env.HOSTNAME,
        /*process.env.SERVERTYPE will be SIT, PREPROD, PROD in lowercases;
        if SERVERTYPE is SIT or PREPROD then app name would get appeneded with SERVERTYPE*/
        app: process.env.SERVERTYPE == 'prod' ? app : app + '-' + process.env.SERVERTYPE,
        type: issueType,
        file: filename,
        method: method,
        desc: desc,
        ts: new Date()
    };
    console.log(JSON.stringify(logData));
    //freeing the memory 
    logData = undefined;
}

module.exports = {
    INFO: (filename, method, desc) => {
        Logging('INFO', filename, method, desc);
    },
    ERROR: (filename, method, desc) => {
        Logging('ERROR', filename, method, desc);
    },
    DEBUG: (filename, method, desc) => {
        Logging('DEBUG', filename, method, desc);
    }
}