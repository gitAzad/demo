import { authenticateToken } from './auth';
import roles from './roles';
import { Response, NextFunction } from 'express';
import IRequest from '../interfaces/IRequest';

export const checkPermission = (permission: any) => [
  authenticateToken,
  (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not authorized to access this resource',
      });
    }
    if (permission.includes(!user?.userType)) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not authorized to access this resource',
      });
    }

    next();
  },
];

//check is admin
export const isAdmin = () => [
  authenticateToken,
  (req: IRequest, res: Response, next: NextFunction) => {
    if (
      req.user.userType !== roles.AUTHOR &&
      req.user.userType !== roles.ADMIN
    ) {
      return res.status(403).send({
        message: 'You are not authorized to perform this action!',
      });
    }

    next();
  },
];

export default checkPermission;
