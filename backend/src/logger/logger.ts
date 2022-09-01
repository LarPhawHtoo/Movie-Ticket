import { createLogger, format, Logger, transports } from 'winston';

import 'winston-daily-rotate-file';


export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new transports.File({
      dirname:"logs",
      filename: "api.log",
      format: format.combine(

        format.json()),
    }),
  ],
  format: format.combine(
    format.metadata(),
    format.timestamp({format:'YYYY-MM-DD HH:mm:ss'})),
});

 