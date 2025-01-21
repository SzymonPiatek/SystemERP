let mockImplementation: any = null;
let mockUser: any = null;

jest.mock('@src/prismaClient', () => ({
  user: {
    findUnique: jest.fn(() => Promise.resolve(mockUser)),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  role: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('@src/modules/authModule', () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn(),
}));

jest.mock('@src/models/auth/services/authService', () => ({
  generateAndSetTokens: jest.fn(),
  refreshAccessToken: jest.fn(),
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
