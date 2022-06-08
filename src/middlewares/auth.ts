import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/IRequest';
import IUser from '../interfaces/IUser';
import usersModel from '../models/users.model';

dotenv.config();

//generate token
export const generateToken = (user: any) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//verify token
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//authenticate token
export const authenticateToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const user = await usersModel.findById(verifyToken(token).id);
    if (!user) return res.sendStatus(401);
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
