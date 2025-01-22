import checkEmptyBody from '@src/middlewares/bodyMiddleware';
import { mockedRequest, mockedResponse, mockedNext } from '@src/tests/mocks';

describe('checkEmptyBody middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 400 if the request body is empty', () => {
    const req = mockedRequest();
    const res = mockedResponse();

    checkEmptyBody(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Request body cannot be empty',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('should call next if the request body is not empty', () => {
    const req = mockedRequest({ key: 'value' });
    const res = mockedResponse();

    checkEmptyBody(req, res, mockedNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalled();
  });
});
