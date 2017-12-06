export const FILTER_TYPES = {
  STRING_FILTER: "StringFilter",
  MULTI_SELECT_FILTER: "MultiSelectFilter",
  RANGE_FILTER: "RangeFilter"
};

export const SORT_ORDER_TYPES = {
  ASCENDING: "asc",
  DESCENDING: "desc"
};

export const ASYNC_STATES = {
  NONE: "NONE",
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
};

export const COLUMNS = [
  {
    key: "name",
    header: "Name",
    filter: { type: FILTER_TYPES.STRING_FILTER }
  },
  {
    key: "animal",
    header: "Animal",
    filter: { type: FILTER_TYPES.MULTI_SELECT_FILTER }
  },
  { key: "colour", header: "Colour" },
  { key: "pattern", header: "Pattern" },
  { key: "rating", header: "Rating", sortable: true },
  {
    key: "price",
    header: "Price",
    filter: { type: FILTER_TYPES.RANGE_FILTER },
    sortable: true
  }
];
