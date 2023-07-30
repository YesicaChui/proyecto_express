import winston from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const customWinstonOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },

    colors: {
        debug: 'white',
        http: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'orange',
        fatal: 'red'
    }
}

winston.addColors(customWinstonOptions.colors)

const createLogger = env => {
    if (env === 'PROD') {
        return winston.createLogger({
            levels: customWinstonOptions.levels,
            transports: [
                new winston.transports.Console({ level: 'info' }),
                new winston.transports.File({
                    level: 'error',
                    filename: 'errors.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.simple(),
                    )
                })
            ]
        })
    } else {
        return winston.createLogger({
            levels: customWinstonOptions.levels,
            level: 'fatal',
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple(),
                    )
                })
            ]
        })
    }
}

const logger = createLogger(process.env.ENVIRONMENT)

export default logger