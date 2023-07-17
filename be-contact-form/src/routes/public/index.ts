import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { prisma } from "../../prismaclient";

const express = require("express");

// Single routing
const router = express.Router();

router.post(
  "/",
  // [
  //   param("sectionName", "Is badly formatted")
  //     .isString()
  //     .isIn(Object.values(Section)),
  // ],
  // [body("data").isObject()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    await prisma.contactForm.create({
      data: {
        content: req.body.data,
        title: req.body.data,
        seen: false,
      },
    });
  }
);

export { router as PublicRouter };
