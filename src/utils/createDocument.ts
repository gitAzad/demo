import mongoose from 'mongoose';
import { Request, Response } from 'express';

export const createDocument = async (
  model: mongoose.Model<mongoose.Document>,
  data: any,
  populateFields: string[] = []
) => {
  const document = new model(data);
  try {
    await document.save();
    if (populateFields.length > 0) {
      populateFields.forEach((field) => {
        document.populate(field);
      });
    }
    return document;
  } catch (error) {
    throw error;
  }
};

export const createDocumentAndSendResponse = async (
  req: Request,
  res: Response,
  model: mongoose.Model<mongoose.Document>,
  data: any,
  populateFields: string[] = []
) => {
  try {
    const document = await createDocument(model, data, populateFields);
    res.status(201).send({
      status: 'success',
      message: 'Document created successfully',
      data: document,
    });
  } catch (error) {
    console.log(error);
    //mongoose duplicate key error
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(500).send({
        error: `${Object.keys(error.keyValue)[0]}:${
          Object.values(error.keyValue)[0]
        } already exists!!`,
      });
    } else {
      res.status(500).send({
        error: error.message,
      });
    }
  }
};
