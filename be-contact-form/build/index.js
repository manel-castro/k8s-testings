"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const error_handler_1 = require("./middlewares/error-handler");
const auth_1 = require("./routes/auth/");
const public_1 = require("./routes/public");
const rabbitMq_1 = require("./rabbitMq");
/**
 * RABBIT MQ
 */
try {
    (0, rabbitMq_1.createRabbitMqConnection)();
}
catch (e) {
    console.log(e);
}
const app = express();
app.use(express.json());
app.use((0, cookie_session_1.default)({
    //this is to set req.session
    signed: false,
    secure: process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS
}));
app.use(cors());
app.use("/auth", auth_1.AuthRouter);
app.use("/public", public_1.PublicRouter);
app.use(error_handler_1.errorHandler);
const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
});
