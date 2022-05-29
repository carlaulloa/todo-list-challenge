import 'reflect-metadata';
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import app from './app';
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap = new DatabaseBootstrap();
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
  } catch (error) {
    console.log(error);
  }
})();

