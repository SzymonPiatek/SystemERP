import { addRangeCondition, addTextCondition } from '@src/utils/queryConditions';

describe('addRangeCondition', () => {
  it('should add gte condition when min is provided', () => {
    const queryConditions: Record<string, any> = {};
    addRangeCondition(queryConditions, 'price', '10', undefined);
    expect(queryConditions).toEqual({
      price: { gte: 10 },
    });
  });

  it('should add lte condition when max is provided', () => {
    const queryConditions: Record<string, any> = {};
    addRangeCondition(queryConditions, 'price', undefined, '20');
    expect(queryConditions).toEqual({
      price: { lte: 20 },
    });
  });

  it('should add both gte and lte conditions when min and max are provided', () => {
    const queryConditions: Record<string, any> = {};
    addRangeCondition(queryConditions, 'price', '10', '20');
    expect(queryConditions).toEqual({
      price: { gte: 10, lte: 20 },
    });
  });

  it('should not modify queryConditions if min and max are not provided', () => {
    const queryConditions: Record<string, any> = {};
    addRangeCondition(queryConditions, 'price', undefined, undefined);
    expect(queryConditions).toEqual({});
  });

  it('should ignore invalid min and max values', () => {
    const queryConditions: Record<string, any> = {};
    addRangeCondition(queryConditions, 'price', 'invalid', '20');
    expect(queryConditions).toEqual({
      price: { lte: 20 },
    });
  });
});

describe('addTextCondition', () => {
  it('should add an "in" condition for a valid array of strings', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', ['tag1', 'tag2', 'tag3']);
    expect(queryConditions).toEqual({
      tags: { in: ['tag1', 'tag2', 'tag3'] },
    });
  });

  it('should trim whitespace in array values and remove empty strings', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', [' tag1 ', '  ', 'tag2', '', ' tag3 ']);
    expect(queryConditions).toEqual({
      tags: { in: ['tag1', 'tag2', 'tag3'] },
    });
  });

  it('should not modify queryConditions if the array is empty after filtering', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', ['  ', '', '   ']);
    expect(queryConditions).toEqual({});
  });

  it('should not modify queryConditions if value is an empty array', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', []);
    expect(queryConditions).toEqual({});
  });

  it('should not modify queryConditions if value is undefined', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', undefined);
    expect(queryConditions).toEqual({});
  });

  it('should handle mixed valid and invalid values in the array', () => {
    const queryConditions: Record<string, any> = {};
    addTextCondition(queryConditions, 'tags', ['valid1', '', '  ', 'valid2']);
    expect(queryConditions).toEqual({
      tags: { in: ['valid1', 'valid2'] },
    });
  });
});
