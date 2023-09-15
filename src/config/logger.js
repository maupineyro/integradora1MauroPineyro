import winston from "winston";

const customLevelsOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors:{
        fatal: 'red',
        error: 'orange',
        warning:'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'

    }
}

//Logger
const logger = winston.createLogger ({
    transports: [
        //console
        new winston.transports.Console({level: 'debug'}),
        //files
        new winston.transports.File({filename:'./errors.log', level:'error'})
],
})

//middleware addLogger
export const addLogger = (req, res, next)=>{
    req.logger = logger;
    req.logger.http ('logger test');
    next();
}