import '@src/tests/mocks';
import prismaClient from '@src/prismaClient';
import { mockedNext, mockedRequest, mockedResponse } from '@src/tests/mocks';
import { emptyRequest } from '@src/tests/data';

describe('prismaClient mocks', () => {
  describe('user', () => {
    it('Should call user.findUnique and resolve with null', async () => {
      const result = await prismaClient.user.findUnique({ where: { id: 1 } });
      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBeNull();
    });

    it('Should call user.create with data', async () => {
      const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'TestPass123!' };
      (prismaClient.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await prismaClient.user.create({
        data: { firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'TestPass123!' },
      });
      expect(prismaClient.user.create).toHaveBeenCalledWith({
        data: { firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'TestPass123!' },
      });
      expect(result).toEqual(mockUser);
    });

    it('Should call user.delete with correct parameters', async () => {
      const mockDeletedUser = { id: 1, name: 'John Doe' };
      (prismaClient.user.delete as jest.Mock).mockResolvedValue(mockDeletedUser);

      const result = await prismaClient.user.delete({ where: { id: 1 } });
      expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockDeletedUser);
    });
  });

  describe('mockedRequest', () => {
    it('Should create a mocked request with default values', () => {
      const req = mockedRequest(emptyRequest);

      expect(req.body).toEqual({});
      expect(req.params).toEqual({});
      expect(req.cookies).toEqual({});
      expect(req.headers).toEqual({});
      expect(req.userId).toBeUndefined();
    });

    it('Should create a mocked request with provided values', () => {
      const req = mockedRequest({
        ...emptyRequest,
        body: { key: 'value' },
        params: { id: '1' },
        cookies: { session: 'abc123' },
        headers: { authorization: 'Bearer token' },
        userId: '123',
      });

      expect(req.body).toEqual({ key: 'value' });
      expect(req.params).toEqual({ id: '1' });
      expect(req.cookies).toEqual({ session: 'abc123' });
      expect(req.headers).toEqual({ authorization: 'Bearer token' });
      expect(req.userId).toBe('123');
    });
  });

  describe('mockedResponse', () => {
    it('Should create a mocked response with default methods', () => {
      const res = mockedResponse();

      expect(typeof res.status).toBe('function');
      expect(typeof res.json).toBe('function');

      res.status(200);
      expect(res.status).toHaveBeenCalledWith(200);

      res.json({ success: true });
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('mockedNext', () => {
    it('Should be a jest mock function', () => {
      expect(typeof mockedNext).toBe('function');

      mockedNext();
      expect(mockedNext).toHaveBeenCalledTimes(1);
    });
  });
});
