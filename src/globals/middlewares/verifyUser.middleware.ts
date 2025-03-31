import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../cores/error.core';
import jwt from 'jsonwebtoken';

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req?.cookies?.accessToken) {
    return next(new BadRequestException('Please login again!'));
  }

  try {
    const token = req.cookies.accessToken;

    const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as UserPayload;

    const { name, email, role, id } = decoded;

    req.currentUser = { id, name, email, role };

    next();
  } catch (error: any) {
    return next(new BadRequestException('Please login again!'));
  }
}
