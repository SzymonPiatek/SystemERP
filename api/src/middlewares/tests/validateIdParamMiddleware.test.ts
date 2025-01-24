import { validateIdParam } from '@src/middlewares/validateIdParamMiddleware';
import { mockedNext, mockedRequest, mockedResponse } from '@src/tests/mocks';
import { emptyRequest } from '@src/tests/data';

describe('validateIdParam middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should respond with 400 if the id parameter is not a valid number', () => {
    const body = { id: 'invalid' };
    const req = mockedRequest({ ...emptyRequest, body: body });
    const res = mockedResponse();

    validateIdParam(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid ID',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should respond with 400 if the id parameter is missing', () => {
    const req = mockedRequest(emptyRequest);
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
