import "reflect-metadata";
import { Container } from "inversify";
import { SERVICES_IDENTIFIERS } from "./container.types";
import { AuthRepository } from '../auth/application/auth.repository';
import { AuthOperation } from '../auth/infrastructure/auth.operation';
import { AuthUsecase } from '../auth/application/auth.usecase';
import { AuthController } from '../auth/adapter/auth.controller';

let container = new Container();

  container
  .bind<AuthRepository>(
    SERVICES_IDENTIFIERS.AUTH_REPOSITORY
  )
  .to(AuthOperation);
container
  .bind<AuthUsecase>(SERVICES_IDENTIFIERS.AUTH_USECASE)
  .to(AuthUsecase);
container
  .bind<AuthController>(
    SERVICES_IDENTIFIERS.AUTH_CONTROLLER
  )
  .to(AuthController);

export default container;
