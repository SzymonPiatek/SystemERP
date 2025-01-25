import paginateData from '@src/utils/pagination';

describe('pagination utility', () => {
  describe('previousPage', () => {
    it('should return undefined if page is 1', () => {
      const result = paginateData([], 10, 1, 50).previous;
      expect(result).toBeUndefined();
    });

    it('should return the previous page number if page is greater than 1', () => {
      const result = paginateData([], 10, 2, 50).previous;
      expect(result).toBe(1);
    });
  });

  describe('nextPage', () => {
    it('should return undefined if on the last page', () => {
      const result = paginateData([], 10, 5, 50).next;
      expect(result).toBeUndefined();
    });

    it('should return the next page number if not on the last page', () => {
      const result = paginateData([], 10, 4, 50).next;
      expect(result).toBe(5);
    });
  });

  describe('paginateData', () => {
    it('should return correct pagination metadata', () => {
      const result = paginateData([1, 2, 3], 10, 2, 25);
      expect(result).toEqual({
        data: [1, 2, 3],
        limit: 10,
        page: 2,
        total: 25,
        totalPages: 3,
        previous: 1,
        next: 3,
      });
    });

    it('should handle empty data and single page', () => {
      const result = paginateData([], 10, 1, 5);
      expect(result).toEqual({
        data: [],
        limit: 10,
        page: 1,
        total: 5,
        totalPages: 1,
        previous: undefined,
        next: undefined,
      });
    });

    it('should handle case where total is 0', () => {
      const result = paginateData([], 10, 1, 0);
      expect(result).toEqual({
        data: [],
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 0,
        previous: undefined,
        next: undefined,
      });
    });
  });
});
