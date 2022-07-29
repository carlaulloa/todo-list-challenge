import { NextFunction, Request, Response } from "express";
import Joi from 'joi';
import { IError } from "../../helper/errors.handler";

export class Validators {
  static JoiObjectId = (message = 'valid id') => Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);

  static validate = (objSchema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const parametersOriginsList = ['params', 'query', 'body', 'headers'];
      const validationList: Array<Promise<any>> = [];

      parametersOriginsList.forEach((origin: string) => {
        if (objSchema.hasOwnProperty(origin)) {
          const dataToValidate = (req as any)[origin];
          validationList.push(objSchema[origin].validate(dataToValidate));
        }
      });

      Promise.all(validationList).then((results) => {
        results.forEach(result => {
          if (result.hasOwnProperty('error')) {
            const error: IError = new Error("Error de validación");
            error.status = 400;
            error.name = 'Parameters error';
            error.message = "Error de validación";
            error.stack = result.error;
            return next(error);
          }
        })
        next();
      });

    }
  }
}
