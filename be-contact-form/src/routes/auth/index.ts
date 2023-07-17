import { GetFormsRouter } from "./get_forms";

const express = require("express");

const router = express.Router();

/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
router.use("/get-form", GetFormsRouter);

export { router as AuthRouter };
