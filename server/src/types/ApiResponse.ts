import { Response } from 'express';

type ApiResponsePayload = any;

export class ApiResponse<T extends ApiResponsePayload> {
  constructor(
    private message: string,
    private payload: T,
    private status: number = 200,
    private errors: any = null
  ) {}

  send(res: Response) {
    res.status(this.status).json({
      success: this.status < 300,
      message: this.message,
      data: this.payload,
      errors: this.errors 
    });
  }
}
