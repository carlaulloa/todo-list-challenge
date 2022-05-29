import Joi from "joi";

export const schema = {
  LOGIN: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  REFRESH_TOKEN: {
    params: Joi.object({
      refreshToken: Joi.string().uuid({ version: "uuidv4" }).required(),
    }),
  },
};
