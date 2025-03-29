import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';
import { userCreateSchema } from '../schemas/user.schema';
import { error } from 'console';
import HTTP_STATUS from '~/globals/constants/http.constant';

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAllUsers();

    res.status(200).json({
      message: 'GET request successfulll!!!!',
      data: users
    });
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  }
}

export const userController: UserController = new UserController();
