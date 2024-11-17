import { Response } from 'express';

export function returnError(res: Response, err: any) {
  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
}
