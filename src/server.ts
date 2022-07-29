import 'reflect-metadata';
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import app from './app';
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { SeedBootstrap } from './bootstrap/seed.bootstrap';

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap = new DatabaseBootstrap();
  const seedBootstrap = new SeedBootstrap();
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
    await seedBootstrap.initialize();
  } catch (error) {
    console.log(error);
  }
})();

