import React from "react";
import { observer } from "mobx-react";
import { iconStyles } from "../ColumnHeader/styles";
import { SORT_ORDER_TYPES } from "config";

const sortingIconsMapping = {
  [SORT_ORDER_TYPES.ASCENDING]: "sort-asc",
  [SORT_ORDER_TYPES.DESCENDING]: "sort-desc",
  none: "sort"
};

const SortingButton = ({ column: { key, sortable }, sorting }) => {
  if (!sortable) {
    return null;
  }

  const icon =
    sortingIconsMapping[
      sorting.column === key && sorting.order ? sorting.order : "none"
    ];

  return (
    <span
      className={`${iconStyles}`}
      onClick={() => sorting.toggleColumnSorting(key)}
    >
      <i className={`fa fa-${icon}`} />
    </span>
  );
};

export default observer(SortingButton);
