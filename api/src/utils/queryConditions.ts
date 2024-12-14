export const addRangeCondition = (queryConditions: Record<string, any>, field: string, min?: string, max?: string) => {
  const parsedMin = min ? Number(min) : undefined;
  const parsedMax = max ? Number(max) : undefined;

  if (parsedMin !== undefined || parsedMax !== undefined) {
    queryConditions[field] = {};
    if (parsedMin !== undefined && !isNaN(parsedMin)) queryConditions[field].gte = parsedMin;
    if (parsedMax !== undefined && !isNaN(parsedMax)) queryConditions[field].lte = parsedMax;
  }
};

export const addTextCondition = (queryConditions: Record<string, any>, field: string, value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    const trimmedValues = value.map((v) => v.trim()).filter((v) => v.length > 0);
    if (trimmedValues.length > 0) {
      queryConditions[field] = { in: trimmedValues };
    }
  } else if (typeof value === 'string' && value.trim().length > 0) {
    queryConditions[field] = { contains: value.trim(), mode: 'insensitive' };
  }
};
