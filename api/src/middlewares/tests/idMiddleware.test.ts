import { validateIdParam } from '@src/middlewares/idMiddleware';
import { mockedNext, mockedRequest, mockedResponse } from '@src/tests/mocks';

describe('validateIdParam middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 400 if the id parameter is not a valid number', () => {
    const req = mockedRequest({}, { id: 'invalid' });
    const res = mockedResponse();

    validateIdParam(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid ID',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('should call next if the id parameter is a valid number', () => {
    const req = mockedRequest({}, { id: '123' });
    const res = mockedResponse();

    validateIdParam(req, res, mockedNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalled();
  });

  it('should respond with 400 if the id parameter is missing', () => {
    const req = mockedRequest();
    const res = mockedResponse();

    validateIdParam(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid ID',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });
});
