import type { Request } from "express";
import { DbUserType } from "./user.types";

export interface RequestWithUser extends Request {
  user: DbUserType
}