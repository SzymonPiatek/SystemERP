import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload;
      userId?: string;
      userRoleName?: string;
    }
  }
}
