import { verify } from "jsonwebtoken";
import { redisClient } from "../..";

const authVerifyListener = async () => {
  console.log("AUTHVERIFYLISTENER SUBSCRIBING");

  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  const publisher = redisClient.duplicate();
  await publisher.connect();

  await subscriber.subscribe("auth:verify:check", async (msg, channel) => {
    console.log("msg: ", msg);
    const { jwt } = JSON.parse(msg);

    console.log("jwt: ", jwt);

    if (!jwt) {
      await publisher.publish(
        "auth:verify:response",
        JSON.stringify({ type: "error", msg: "no jwt token" })
      );
      return;
    }
    console.log("trying to publish1");

    try {
      const payload = verify(jwt, process.env.JWT_KEY!);
      console.log("trying to publish2");

      await publisher.publish(
        "auth:verify:response",
        JSON.stringify({ type: "response", msg: payload })
      );
      console.log("PUBLISHED");
      return;
    } catch (e) {
      await publisher.publish(
        "auth:verify:response",
        JSON.stringify({ type: "error", msg: "jwt token invalid" })
      );
      return;
    }
  });
};

export default authVerifyListener;
