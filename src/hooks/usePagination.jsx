const usePagination = ({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount,
  boundaryCount,
}) => {
  const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }).map((_, idx) => idx + start);
  };

  const startPage = 1;
  const endPage = count;

  const startPages = range(startPage, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(page + 1 - siblingCount, count - boundaryCount - siblingCount * 2),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(page + 1 + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage - 1
  );

  const itemList = [
    "prev",
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),
    ...endPages,
    "next",
  ];

  const items = itemList.map((item, idx) =>
    typeof item === "number"
      ? {
          key: idx,
          onClick: () => onPageChange(item - 1),
          disabled,
          selected: item - 1 === page,
          item,
        }
      : {
          key: idx,
          onClick: () => onPageChange(item === "next" ? page + 1 : page - 1),
          disabled:
            disabled ||
            item.indexOf("ellipsis") > -1 ||
            (item === "next" ? page >= count - 1 : page < 1),
          selected: false,
          item,
        }
  );

  return { items };
};

export default usePagination;
