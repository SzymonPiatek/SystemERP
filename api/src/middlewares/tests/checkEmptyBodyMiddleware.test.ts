import checkEmptyBody from '@src/middlewares/checkEmptyBodyMiddleware';
import { mockedRequest, mockedResponse, mockedNext } from '@src/tests/mocks';
import { emptyRequest } from '@src/tests/data';

describe('checkEmptyBody middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should respond with 400 if the request body is empty', () => {
    const req = mockedRequest(emptyRequest);
    const res = mockedResponse();

    checkEmptyBody(req, res, mockedNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Request body cannot be empty',
    });
    expect(mockedNext).not.toHaveBeenCalled();
  });

  it('Should call next if the request body is not empty', () => {
    const body = { key: 'value' };
    const req = mockedRequest({ ...emptyRequest, body: body });
    const res = mockedResponse();

    checkEmptyBody(req, res, mockedNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalled();
  });
});
