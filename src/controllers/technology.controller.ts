import { Response } from 'express';
import { body } from 'express-validator';
import IRequest from '../interfaces/IRequest';
import technologyModel from '../models/technology.model';
import { createDocumentAndSendResponse } from '../utils/createDocument';
import { deleteDocumentByIdAndSendResponse } from '../utils/deleteDocumentById';
import { findDocumentByIdAndSendResponse } from '../utils/findDocumentById';
import { getAllDocumentAndSendResponse } from '../utils/getAllDocument';
import { updateDocumentByIdAndSendResponse } from '../utils/updateDocumentById';
import { validate } from '../utils/validate';

export const getAllTechnology = async (req: IRequest, res: Response) => {
  let fields = (req.query.fields as string) || '';
  req.query.fields = fields.concat(',-password');

  await getAllDocumentAndSendResponse(
    req,
    res,
    technologyModel,
    {},
    [],
    ['title', 'description']
  );
};

export const getTechnologyById = async (req: IRequest, res: Response) => {
  await findDocumentByIdAndSendResponse(req, res, technologyModel, []);
};

export const createTechnology = [
  validate([body('title').notEmpty().withMessage('Title is required')]),
  async (req: IRequest, res: Response) => {
    await createDocumentAndSendResponse(
      req,
      res,
      technologyModel,
      req.body,
      []
    );
  },
];

export const updateTechnologyById = async (req: IRequest, res: Response) => {
  await updateDocumentByIdAndSendResponse(req, res, technologyModel, req.body);
};

export const deleteTechnologyById = async (req: IRequest, res: Response) => {
  await deleteDocumentByIdAndSendResponse(req, res, technologyModel);
};
