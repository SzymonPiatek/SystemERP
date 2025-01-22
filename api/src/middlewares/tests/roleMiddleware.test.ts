import '@src/tests/mocks';
import { authorizeRole } from '@src/middlewares/roleMiddleware';
import prisma from '@src/prismaClient';
import { mockedNext, mockedRequest, mockedResponse } from '@src/tests/mocks';
import { emptyRequest } from '@src/tests/data';

describe('authorizeRole middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should respond with 403 if userId is not present', async () => {
    const req = mockedRequest(emptyRequest);
    const res = mockedResponse();

    const middleware = authorizeRole(['ADMIN']);
    await middleware(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Access denied',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should respond with 403 if user is not found', async () => {
    const req = mockedRequest({ ...emptyRequest, body: { userId: 1 } });
    const res = mockedResponse();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const middleware = authorizeRole(['ADMIN']);
    await middleware(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Access denied',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should respond with 403 if user role is not allowed', async () => {
    const req = mockedRequest({ ...emptyRequest, body: { userId: 1 } });
    const res = mockedResponse();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      profile: {
        role: {
          name: 'USER',
        },
      },
    });

    const middleware = authorizeRole(['ADMIN']);
    await middleware(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Access denied',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should respond with 403 if user not exist (access denied)', async () => {
    const req = mockedRequest({ ...emptyRequest, body: { userId: 1 } });
    const res = mockedResponse();

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const middleware = authorizeRole(['ADMIN']);
    await middleware(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Access denied',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });
});
