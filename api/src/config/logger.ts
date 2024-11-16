import { createLogger, transports, format } from 'winston';

const logLevel = process.env.DEBUG === 'TRUE' ? 'debug' : 'info';

const logFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.printf(({ timestamp, level, message, ...rest }) => {
    let restString = JSON.stringify(rest, null, 2);
    restString = restString === '{}' ? '' : restString;

    return `[${timestamp}] ${level}: ${message} ${restString}`;
  }),
);

const logger = createLogger({
  level: logLevel,
  format: logFormat,
  transports: [
    new transports.Console({
      format: logFormat,
    }),
  ],
});

export default logger;
