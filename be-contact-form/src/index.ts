require("dotenv").config();
const express = require("express");
var cors = require("cors");
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { AuthRouter } from "./routes/auth/";
import { PublicRouter } from "./routes/public";

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    //this is to set req.session
    signed: false,
    secure: process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS
  })
);

app.use(cors());

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port " + PORT);
});
