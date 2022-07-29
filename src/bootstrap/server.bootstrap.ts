import http from "http";
import { Application } from "express";
import { AddressInfo } from "net";

interface Address extends AddressInfo {
  port: number;
}

export interface IServerBootstrap {
  initialize(): Promise<any>;
}

export class ServerBootstrap implements IServerBootstrap {
  constructor(private app: Application) {}

  initialize(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(process.env.PORT)
        .on("listening", () => {
          console.log(
            `Server is running at port ${(server.address() as Address).port}`
          );
          resolve(true);
        })
        .on("error", (error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
