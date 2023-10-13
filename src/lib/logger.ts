import winston = require("winston");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "info";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
  winston.format.colorize({all: true}),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);
const fileFormat = winston.format.combine(
  winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss:ms"}),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      format: fileFormat,
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      format: fileFormat,
      filename: "logs/all.log",
    }),
  ],
});

export default Logger;
