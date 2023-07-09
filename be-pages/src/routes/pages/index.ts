import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prismaclient";
import { request } from "http";
import { body, check, param, validationResult } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Section } from "@prisma/client";

const express = require("express");

// Single routing
const router = express.Router("pages");

router.get(
  "/:sectionName",
  [
    param("sectionName", "Is badly formatted")
      .isString()
      .isIn(Object.values(Section)),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { sectionName } = req.params;

    const heroSection = await prisma.heroSection.findMany({
      where: {
        section: sectionName as Section,
      },
    });

    return res.send(heroSection);
  }
);
router.patch(
  "/:sectionName",
  [
    param("sectionName", "Is badly formatted")
      .isString()
      .isIn(Object.values(Section)),
  ],
  [body("data").isObject()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { sectionName } = req.params;

    const heroSection = await prisma.heroSection.updateMany({
      where: {
        section: sectionName as Section,
      },
      data: {
        section: sectionName as Section,
        data: req.body.data,
      },
    });
    if (heroSection.count === 0) {
      await prisma.heroSection.create({
        data: {
          section: sectionName as Section,
          data: req.body.data,
        },
      });

      heroSection.count = 1;
    }
    res.send(heroSection);
    res.end();
  }
);

export { router as PagesRouter };
