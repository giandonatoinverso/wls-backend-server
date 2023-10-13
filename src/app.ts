import morganMiddleware from "./lib/morgan";
import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import Logger from "./lib/logger";
import { NotFound, InternalServerError } from "http-errors";


const express = require("express");
const app = express();

// Log requests
app.use(morganMiddleware);

/*
 *  Routes
*/

app.use("/oauth", require("./routes/oauth"));
app.use("/wholesales", require("./routes/wholesales"));
app.use("/utenti", require("./routes/utenti"));


// Default
app.use(((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(constants.HTTP_STATUS_BAD_REQUEST);
}));


// Error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  const stack = req.app.get("env") === "development" ? err : {};

  Logger.error(err.stack);

  if (err instanceof NotFound) {
    res.status(404).json({ error: err.message });
  } else if (err instanceof InternalServerError) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Errore interno del server" });
  }
});


export { app };
