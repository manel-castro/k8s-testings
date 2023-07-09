"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const pages_1 = require("./routes/pages");
const app = express();
app.use(cors());
app.use(pages_1.PagesRouter);
const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
});
