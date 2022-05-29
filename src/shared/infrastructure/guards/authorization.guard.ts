import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../helper/errors.handler";

export class AuthorizationGuard {
  static canActivate(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { roles } = res.locals.payload;
      let roleMatches = false;
      for (const role of roles) {
        if (allowedRoles.indexOf(role) > -1) {
          roleMatches = true;
          next();
          break;
        }
      }
      if (!roleMatches) {
        throw new CustomError(401, "No tiene permiso a este servicio.");
      }
    };
  }
}
