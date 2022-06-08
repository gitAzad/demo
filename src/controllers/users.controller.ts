import { Response } from 'express';
import IRequest from '../interfaces/IRequest';
import usersModel from '../models/users.model';
import { createDocumentAndSendResponse } from '../utils/createDocument';
import { deleteDocumentByIdAndSendResponse } from '../utils/deleteDocumentById';
import { findDocumentByIdAndSendResponse } from '../utils/findDocumentById';
import { getAllDocumentAndSendResponse } from '../utils/getAllDocument';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';

import { generateToken } from '../middlewares/auth';
import { updateDocumentByIdAndSendResponse } from '../utils/updateDocumentById';
import { validate } from '../utils/validate';
import { uploadOnAwsS3 } from '../utils/uploadAWS';

export const getAllUsers = async (req: IRequest, res: Response) => {
  let fields = (req.query.fields as string) || '';
  req.query.fields = fields.concat(',-password');

  await getAllDocumentAndSendResponse(
    req,
    res,
    usersModel,
    {
      _id: {
        $ne: req.userId,
      },
    },
    [],
    ['username', 'email']
  );
};

export const getUserById = async (req: IRequest, res: Response) => {
  await findDocumentByIdAndSendResponse(req, res, usersModel, []);
};

export const createUser = [
  validate([
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('username').notEmpty().withMessage('Full name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
  ]),
  async (req: IRequest, res: Response) =>
    await createDocumentAndSendResponse(req, res, usersModel, req.body, []),
];

export const updateUserById = async (req: IRequest, res: Response) => {
  await updateDocumentByIdAndSendResponse(req, res, usersModel, req.body);
};

export const deleteUserById = async (req: IRequest, res: Response) => {
  await deleteDocumentByIdAndSendResponse(req, res, usersModel);
};

export const login = async (req: IRequest, res: Response) => {
  let { email, password } = req.body;
  password = password.toString();
  const user = await usersModel.findOne({ email }).lean();
  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.status(200).send({ user, token });
};

export const uploadFile = [
  async (req: any, res: Response) => {
    await uploadOnAwsS3(req, res, () => {
      res.status(200).send({
        message: 'File uploaded successfully',
        url: req.file.location,
      });
    });
  },
];
