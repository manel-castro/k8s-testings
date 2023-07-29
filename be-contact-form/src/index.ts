require("dotenv").config();
const express = require("express");
var cors = require("cors");
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { AuthRouter } from "./routes/auth/";
import { PublicRouter } from "./routes/public";
import { natsWrapper } from "./nats-wrapper";
import * as redis from "redis";

export const redisClient = redis.createClient({
  url: "redis://redis",
  password: "123456",
});

const start = async () => {
  /**
   * Environment variables verification
   */
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  /**
   * Redis
   */
  try {
    // redisClient.on("connect", () => {
    //   console.log("Connected to redis");
    // });
    // redisClient.on("error", (err) => {
    //   console.log("Error connecting to redis: ", err);
    // });
    // await redisClient.connect();
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
  } catch (e) {
    console.log(e);
  }

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
};

start();
