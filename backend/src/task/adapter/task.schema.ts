import Joi from "joi";
import { Validators } from "../../shared/adapter/validator";

export const schema = {
  INSERT: {
    body: Joi.object({
      description: Joi.string().min(3).max(100).required(),
      startDate: Joi.date().iso().allow(null),
      endDate: Joi.date().iso().allow(null).min(Joi.ref("startDate")),
      state: Joi.object({
        id: Joi.string().required()
      }),
    })
  },
  UPDATE: {
    params: Joi.object({
      taskId: Validators.JoiObjectId().required(),
    }),
    body: Joi.object({
      description: Joi.string().required(),
      state: Joi.object({
        id: Joi.string().required()
      }),
      startDate: Joi.date().iso().allow(null),
      endDate: Joi.date().iso().allow(null).min(Joi.ref("startDate")),
    })
  },
  REMOVE: {
    params: Joi.object({
      taskId: Validators.JoiObjectId().required(),
    }),
  },
  LIST_BY_PAGE: {
    query: Joi.object({
      page: Joi.number().min(1).required(),
      size: Joi.number().min(0).required(),
    }),
  },
};
