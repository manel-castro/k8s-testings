import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clientId, clientId, { url });

    return new Promise((res, rej) => {
      this._client!.on("connect", () => {
        console.log("Connected to NATS");
        res();
      });
      this._client!.on("error", () => {
        console.log("Connected to NATS");
        rej();
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
