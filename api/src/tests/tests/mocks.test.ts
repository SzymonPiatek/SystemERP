import '@src/tests/mocks';
import prismaClient from '@src/prismaClient';

describe('prismaClient mocks', () => {
  describe('user', () => {
    it('should call user.findUnique and resolve with null', async () => {
      const result = await prismaClient.user.findUnique({ where: { id: 1 } });
      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toBeNull();
    });

    it('should call user.create with data', async () => {
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

    it('should call user.delete with correct parameters', async () => {
      const mockDeletedUser = { id: 1, name: 'John Doe' };
      (prismaClient.user.delete as jest.Mock).mockResolvedValue(mockDeletedUser);

      const result = await prismaClient.user.delete({ where: { id: 1 } });
      expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockDeletedUser);
    });
  });
});
