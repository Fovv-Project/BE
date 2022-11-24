const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
        (info) => `[${info.timestamp}] ${info.level.toUpperCase()}! ${info.message}`
    )
);

let logger = new createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                customFormat,
                format.colorize({ all: true })
            ),
        })
    ],
    exitOnError: false
});

const error = (scope, message) => {
    const obj = {
        scope,
        message: message
    };
    logger.error(obj);
};


module.exports = {
    error
}