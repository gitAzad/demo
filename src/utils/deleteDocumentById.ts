import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { findDocumentById } from './findDocumentById';

export const deleteDocumentById = async (
  id: string,
  model: mongoose.Model<mongoose.Document>
) => {
  try {
    const document = await findDocumentById(id, model);
    if (!document) {
      return;
    }
    await document.remove();
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteDocumentByIdAndSendResponse = async (
  req: Request,
  res: Response,
  model: mongoose.Model<mongoose.Document>
) => {
  try {
    const document = await deleteDocumentById(req.params.id, model);
    if (!document) {
      res.status(404).send({
        status: 'error',
        message: 'Document not found',
      });
    } else {
      res.status(200).send({
        status: 'success',
        message: 'Document deleted',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
