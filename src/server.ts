import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import appRoutes from './globals/routes/appRoutes';
import { CustomError, NotFoundException } from './globals/cores/error.core';
import HTTP_STATUS from './globals/constants/http.constant';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }
 
  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private setupGlobalError(): void {
    // all = [get, post, put, delete, patch, ...]
    this.app.all('*', (req, res, next) => {
      next(new NotFoundException(`The URl ${req.originalUrl} not found with method ${req.method}`));
    });

    //Global error => error, req,res, next
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
        });
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong! Please try again later'
      });
    });
  }

  private listenServer() {
    const port = process.env.PORT || 5050;

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default Server;
