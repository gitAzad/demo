import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { findDocumentById } from './findDocumentById';

export const updateDocumentById = async (
  id: string,
  model: mongoose.Model<mongoose.Document>,
  data: any,
  populateFields: string[] = []
) => {
  try {
    const document = await findDocumentById(id, model, populateFields);
    const updatedDocument = await model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedDocument;
  } catch (error) {
    console.log(error);
  }
};

export const updateDocumentByIdAndSendResponse = async (
  req: Request,
  res: Response,
  model: mongoose.Model<mongoose.Document>,
  data: any,
  populateFields: string[] = []
) => {
  try {
    const document = await updateDocumentById(
      req.params.id,
      model,
      data,
      populateFields
    );
    if (!document) {
      res.status(404).send({
        status: 'error',
        message: 'Document not found',
      });
    } else {
      res.status(200).send({
        status: 'success',
        message: 'Document updated',
        data: document,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
