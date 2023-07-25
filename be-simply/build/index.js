"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const current_user_1 = require("./routes/current-user");
/**
 * RABBIT MQ
 */
try {
}
catch (e) {
    console.log(e);
}
/**
 * API REST
 */
const app = express();
app.use(express.json());
app.use((0, cookie_session_1.default)({
    signed: false,
    secure: false && process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS // TODO: enable this
}));
app.use(cors());
app.use(current_user_1.CurrentUserRouter);
const PORT = process.env.PORT || 9002;
app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
});
