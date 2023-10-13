import { app } from "./app";
import Logger from "./lib/logger";
import { db } from "./lib/db";
import * as jwtUtils from "./jwtUtils";

let port = 8083;
if (process.env.PORT !== undefined) {
  port = parseInt(process.env.PORT, 10);
}
app.listen(port, "0.0.0.0", function () {
  Logger.info("Server listening on 0.0.0.0:" + port);
  Logger.debug("Debug logs enabled");
});

// Test DB
db.getConnection((err, conn) => {
  if (err !== null) {
    Logger.error("DB connection failed");
    throw err;
  }
  conn.release();
});

jwtUtils.startTokenCleanupInterval();
