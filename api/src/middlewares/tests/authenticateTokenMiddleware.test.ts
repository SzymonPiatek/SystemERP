import '@src/tests/mocks';
import { authenticateToken } from '@src/middlewares/authenticateTokenMiddleware';
import { mockedRequest, mockedResponse, mockedNext } from '@src/tests/mocks';
import { emptyRequest } from '@src/tests/data';

describe('authenticateTokenMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should respond with 401 if no token is found in cookies', () => {
    const req = mockedRequest(emptyRequest);
    const res = mockedResponse();

    authenticateToken(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Access token not found in cookies' });
    expect(mockedNext).not.toHaveBeenCalled();
  });
});
