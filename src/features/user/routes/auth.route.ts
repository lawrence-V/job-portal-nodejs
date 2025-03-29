import express from 'express';
import { authController } from '../controllers/auth.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const authRoute = express.Router();

authRoute.post('/signup', asyncWrapper(authController.signUp));
authRoute.post('/sign-in', asyncWrapper(authController.signIn));
authRoute.get('/me', verifyUser, asyncWrapper(authController.getCurrentUser));
authRoute.post('/logout', verifyUser, asyncWrapper(authController.logout));

export default authRoute;
