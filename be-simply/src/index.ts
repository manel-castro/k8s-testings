require("dotenv").config();
const express = require("express");
var cors = require("cors");
import cookieSession from "cookie-session";

import { CurrentUserRouter } from "./routes/current-user";

/**
 * RABBIT MQ
 */
try {
} catch (e) {
  console.log(e);
}

/**
 * API REST
 */

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false && process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS // TODO: enable this
  })
);

app.use(cors());

app.use(CurrentUserRouter);

const PORT = process.env.PORT || 9002;
app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port " + PORT);
});
