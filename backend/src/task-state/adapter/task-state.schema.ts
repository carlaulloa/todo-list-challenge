import Joi from "joi";
import { Validators } from "../../shared/adapter/validator";

export const schema = {
  INSERT: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  UPDATE: {
    params: Joi.object({
      taskStateId: Validators.JoiObjectId().required()
    }),
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  REMOVE: {
    params: Joi.object({
      taskStateId: Validators.JoiObjectId().required()
    })
  },
};
