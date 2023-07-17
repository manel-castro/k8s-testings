import { NextFunction, Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import { prisma } from "../../../prismaclient";
const express = require("express");

const router = express.Router();

router.get(
  "/",
  [
    // param("sectionName", "Is badly formatted")
    //   .isString()
    //   .isIn(Object.values(Section)),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;

    const heroSection = await prisma.contactForm.findMany({
      where: {},
    });

    return res.send(heroSection);
  }
);

export { router as GetFormsRouter };
