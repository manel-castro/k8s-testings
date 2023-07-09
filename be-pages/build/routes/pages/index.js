"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesRouter = void 0;
const express = require("express");
// Single routing
const router = express.Router();
exports.PagesRouter = router;
router.get("/", function (req, res, next) {
    console.log("Pages router");
    res.end();
});
