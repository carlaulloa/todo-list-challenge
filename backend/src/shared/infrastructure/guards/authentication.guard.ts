import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../helper/errors.handler";
import { UserService } from '../../../user/application/user.service';

export class AuthenticationGuard {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    const authorization = headers.authorization;
    if(authorization) {
      const [ , token ] = authorization.split(' ');
      if(token){
        UserService.validateAccessToken(token)
          .then(payload => {  
            res.locals.payload = payload;
            next();
          }).catch(error => {
            next(error);
          });
      } else {
        throw new CustomError(401, 'No autorizado');
      }
    } else {
      throw new CustomError(401, 'No autorizado');
    }
  }
}