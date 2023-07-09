require("dotenv").config();
const express = require("express");
var cors = require("cors");
import { errorHandler } from "./middlewares/error-handler";
import { validateRequest } from "./middlewares/validate-request";
import { prisma } from "./prismaclient";
import { PagesRouter } from "./routes/pages";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/pages", PagesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port " + PORT);
});
