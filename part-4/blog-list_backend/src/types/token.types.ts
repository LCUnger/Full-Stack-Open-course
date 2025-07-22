import mongoose from "mongoose";
import type { Request } from 'express'

export interface TokenPayload {
  username: string;
  id: mongoose.Types.ObjectId
}

export interface RequestWithToken extends Request {
  token?: string
}