import Joi from "joi";
import { Validators } from "../../shared/adapter/validator";

export const schema = {
  INSERT: {
    body: Joi.object({
      description: Joi.string().required(),
      startDate: Joi.date().iso(),
      endDate: Joi.date().iso(),
      state: Joi.object({
        id: Joi.string().required()
      }),
    }).when(Joi.object({ startDate: Joi.exist(), endDate: Joi.exist() }), {
      then: Joi.object({
        endDate: Joi.date().iso().min(Joi.ref("startDate")),
      }),
    }),
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
      startDate: Joi.date().iso(),
      endDate: Joi.date().iso(),
    }).when(Joi.object({ startDate: Joi.exist(), endDate: Joi.exist() }), {
      then: Joi.object({
        endDate: Joi.date().iso().min(Joi.ref("startDate")),
      }),
    }),
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
