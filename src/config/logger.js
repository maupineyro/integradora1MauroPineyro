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
    req.logger = logger;
    req.logger.http ('logger test');
    next();
}