import mongoose from "mongoose";

export interface TokenPayload {
  username: string;
  id: mongoose.Types.ObjectId
}