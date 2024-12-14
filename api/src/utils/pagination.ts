function previousPage(page: number): number | undefined {
  return page > 1 ? page - 1 : undefined;
}

function nextPage(page: number, limit: number, totalEntityNumber: number): number | undefined {
  const totalPages = Math.ceil(totalEntityNumber / limit);
  return page < totalPages ? page + 1 : undefined;
}

function paginateData<T>(data: T[], limit: number, page: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const previous = previousPage(page);
  const next = nextPage(page, limit, total);

  return {
    data,
    limit,
    page,
    total,
    totalPages,
    previous,
    next,
  };
}

export default paginateData;
