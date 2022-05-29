import * as bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/user.entity";
import jwt from "jwt-simple";
import moment from "moment";
import yenv from "yenv";
import { CustomError } from "../../helper/errors.handler";

const env = yenv();
export class UserService {
  static async encryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static async validatePassword(
    encryptedPassowrd: string,
    password: string
  ): Promise<boolean> {
    return await bcryptjs.compare(password, encryptedPassowrd);
  }

  static async generateAccessToken(user: Partial<User>): Promise<string> {
    const iat = moment().unix();
    const exp = moment().add(env.TOKEN.TIMEOUT, "milliseconds").unix();
    const payload = {
      email: user.email,
      fullName: user.fullName,
      iat,
      exp,
      roles: user.roles
    };
    const accessToken = await jwt.encode(payload, env.TOKEN.SECRET);
    return accessToken;
  }

  static validateAccessToken(accessToken: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(accessToken, env.TOKEN.SECRET);
        resolve(payload);
      } catch (error) {
        if (error.message.toLowerCase() === "token expired") {
          reject(new CustomError(409, "Token ha expirado."));
        } else {
          reject(new CustomError(401, "No autorizado."));
        }
      }
    });
    return promise;
  }
}
