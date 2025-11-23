// src/utils/response.ts
import { Response } from "express";

export const success = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({ statusCode, data });
};

export const error = (res: Response, message: string, statusCode = 500) => {
  return res.status(statusCode).json({ statusCode, message });
};
