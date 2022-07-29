import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  constructor(
    public status: number,
    public message: string){
      super(message);
  }
}

export interface IError extends Error {
  status?: number;
}

export class ErrorHandler {
  static handlePathNotFound = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const err: IError = new Error("Path not foudn");
    err.status = 404;
    next(err);
  };

  static handleGenericErrors = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const objError = error as IError;
    res.status(objError.status || 500).json({
      status: objError.status,
      name: objError.name,
      message: objError.message,
      ...(process.env.NODE_ENV !== "prod" && { stack: objError.stack }),
    });
  };

  static handleAsyncError = (ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      ftn(req, res, next).catch(err => {
        const objError = err as IError;
        objError.status = objError.status || 500;
        next(objError);
      });
    }
  }
}

