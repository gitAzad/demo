import { Response } from 'express';
import { body } from 'express-validator';
import IRequest from '../interfaces/IRequest';
import newsModel from '../models/news.model';
import { createDocumentAndSendResponse } from '../utils/createDocument';
import { deleteDocumentByIdAndSendResponse } from '../utils/deleteDocumentById';
import { findDocumentByIdAndSendResponse } from '../utils/findDocumentById';
import { getAllDocumentAndSendResponse } from '../utils/getAllDocument';
import { updateDocumentByIdAndSendResponse } from '../utils/updateDocumentById';
import { validate } from '../utils/validate';

export const getAllNews = async (req: IRequest, res: Response) => {
  let fields = (req.query.fields as string) || '';
  req.query.fields = fields.concat(',-password');

  await getAllDocumentAndSendResponse(
    req,
    res,
    newsModel,
    {},
    ['technology', 'author'],
    ['title', 'description']
  );
};

export const getNewsById = async (req: IRequest, res: Response) => {
  await findDocumentByIdAndSendResponse(req, res, newsModel, []);
};

export const createNews = [
  validate([
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('technology').notEmpty(),
  ]),
  async (req: IRequest, res: Response) => {
    await createDocumentAndSendResponse(req, res, newsModel, req.body, []);
  },
];

export const updateNewsById = async (req: IRequest, res: Response) => {
  await updateDocumentByIdAndSendResponse(req, res, newsModel, req.body);
};

export const deleteNewsById = async (req: IRequest, res: Response) => {
  await deleteDocumentByIdAndSendResponse(req, res, newsModel);
};
