import { Request, Response } from 'express';

jest.mock('@src/prismaClient', () => ({
  user: {
    findUnique: jest.fn(() => Promise.resolve(null)),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  role: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  note: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  event: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  company: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('@src/modules/authModule', () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn(),
}));

jest.mock('@src/models/auth/services/authService', () => ({
  generateAndSetTokens: jest.fn(),
  refreshAccessToken: jest.fn(),
  verifyToken: jest.fn(),
}));

jest.mock('@src/middlewares/authMiddleware', () => ({
  authenticateToken: jest.fn((req, res, next) => {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Access token not found in cookies' });
      return;
    }
    req.userId = 1;
    next();
  }),
}));

jest.mock('@src/config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('@src/utils/error', () => ({
  returnError: jest.fn(),
}));

export const mockedRequest = ({
  body = {},
  params = {},
  cookies = {},
  headers = {},
  userId = undefined,
}: {
  body: Record<string, unknown>;
  params: Record<string, string>;
  cookies: Record<string, string>;
  headers: Record<string, string>;
  userId: number | string | undefined;
}) => {
  const req: Partial<Request> = {
    cookies: cookies,
    userId: userId?.toString(),
    headers: headers,
    body: body,
    params: params,
  };
  return req as Request;
};

export const mockedResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res as Response;
};

export const mockedNext = jest.fn();
