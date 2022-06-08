import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import IRequest from '../interfaces/IRequest';

export const validate = (validations: any) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    console.log(errors.array());

    // //set custom error message
    // const customErr = errors.array().map((err) => {
    //   return {
    //     [err.param]: `${err.value ? err.value : ''} ${err.msg}`,
    //   };
    // });

    res.status(400).json({ errors: errors.array() });
  };
};
