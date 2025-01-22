import '@src/tests/mocks';
import { authenticateToken } from '@src/middlewares/authMiddleware';
import { mockedRequest, mockedResponse, mockedNext } from '@src/tests/mocks';

describe('authMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 401 if no token is found in cookies', () => {
    const req = mockedRequest();
    const res = mockedResponse();

    authenticateToken(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access token not found in cookies' });
    expect(mockedNext).not.toHaveBeenCalled();
  });
});
