require("dotenv").config();
const express = require("express");
var cors = require("cors");
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { CurrentUserRouter } from "./routes/current-user";
import { SigninRouter } from "./routes/signin";
import { SignupRouter } from "./routes/signup";

import * as redis from "redis";
import { AuthVerifyListener } from "./events/listeners/auth-verify-listener";
import { natsWrapper } from "./nats-wrapper";

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
   * NATS
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
    new AuthVerifyListener(natsWrapper.client);
  } catch (e) {
    console.log(e);
  }

  /**
   * API REST
   */

  const app = express();

  app.use(express.json());
  app.use(
    cookieSession({
      signed: false,
      secure: false && process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS // TODO: enable this
    })
  );

  app.use(cors());

  app.use(SignupRouter);
  app.use(SigninRouter);
  app.use(CurrentUserRouter);

  app.use(errorHandler);

  const PORT = process.env.PORT || 9001;
  app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
  });
};
start();
