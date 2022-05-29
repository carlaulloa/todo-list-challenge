import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthUsecase } from '../application/auth.usecase';
import { SERVICES_IDENTIFIERS } from '../../bootstrap/container.types';
import { User } from "../../user/entities/user.entity";

@injectable()
export class AuthController {

  constructor(
    @inject(SERVICES_IDENTIFIERS.AUTH_USECASE) private readonly authUsecase: AuthUsecase
  ){}

  async login(req: Request, res: Response) {
    const body = req.body;
    const auth = await this.authUsecase.login(body);
    res.json(auth);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.params;
    const user: Partial<User> = {
      refreshToken
    };
    const auth = await this.authUsecase.getNewAccessToken(user);
    res.json(auth);
  }

}