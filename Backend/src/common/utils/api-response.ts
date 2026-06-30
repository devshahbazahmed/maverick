import { type Response } from 'express';

class ApiResponse {
  constructor() {}

  static ok<T>(res: Response, message: string, data: T) {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(res: Response, message: string, data: T) {
    res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res: Response) {
    res.status(204).send();
  }
}

export default ApiResponse;
