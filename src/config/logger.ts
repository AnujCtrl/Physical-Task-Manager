import winston, { Logform } from "winston";
import path from "path";
import { log } from "console";

const logDir = "logs";
const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
    level:process.env.NODE_ENV === 'production' ? 'info' :'debug',
    format: combine(
        errors({stack:true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat
    ),
    transports:[
        new winston.transports.Console({
            format:combine(colorize(),logFormat)
        }),
        new winston.transports.File({
            filename:path.join(logDir,'error.log'),
            level:'error',
            maxsize: 5242880,
            maxFiles:5
        }),
        new winston.transports.File({
            filename:path.join(logDir,'combined.log'),
            maxsize: 5242880,
            maxFiles:5
        })
    ],
    exceptionHandlers:[
        new winston.transports.File({
            filename:path.join(logDir,'exceptions.log')
        })
    ],
    rejectionHandlers:[
        new winston.transports.File({
            filename:path.join(logDir,'rejections.log')
        })
    ]
})

export default logger;