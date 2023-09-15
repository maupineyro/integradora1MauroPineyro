import winston from "winston";
import config from "./config.js";

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

//Loggers
//devLogger
const  devLogger = winston.createLogger ({
    levels: customLevelsOptions.levels,
    transports: [
        //console
        new winston.transports.Console(
            {
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }),
        //files
        new winston.transports.File(
            {
                filename:'./errors.log', 
                level:'error',
                format: winston.format.simple()
            }
        )
    ],
})

//prodLogger

const  prodLogger = winston.createLogger ({
    levels: customLevelsOptions.levels,
    transports: [
        //console
        new winston.transports.Console(
            {
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }),
        //files
        new winston.transports.File(
            {
                filename:'./errors.log', 
                level:'error',
                format: winston.format.simple()
            }
        )
    ],
})


//middleware addLogger
export const addLogger = (req, res, next)=>{
    if(config.environment === "production"){
        req.logger = prodLogger;
        req.logger.warning("test de level warning en production");
        req.logger.http(`${req.method} en ${req.url} - winston log en production`)   
    } else {
        req.logger = devLogger;
        req.logger.warning("test de level warning en development");
        req.logger.http(`${req.method} en ${req.url} - winston log en development`)  
    }   
    next();
}