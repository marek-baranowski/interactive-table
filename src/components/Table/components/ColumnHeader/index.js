import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import { observer } from "mobx-react";
import { iconStyles, headerTitleStyles } from "./styles";
import { StringFilter, MultiSelectFilter, RangeFilter } from "../Filters";
import { SORTING_ORDER_TYPES, FILTER_TYPES } from "../../../../settings";

const sortingIconsMapping = {
  [SORTING_ORDER_TYPES.ASCENDING]: "sort-asc",
  [SORTING_ORDER_TYPES.DESCENDING]: "sort-desc",
  none: "sort"
};

const filtersToComponentsMapping = {
  [FILTER_TYPES.STRING_FILTER]: StringFilter,
  [FILTER_TYPES.MULTI_SELECT_FILTER]: MultiSelectFilter,
  [FILTER_TYPES.RANGE_FILTER]: RangeFilter
};

export const ColumnHeader = ({
  store,
  column: { key, header, filter, sortable }
}) => {
  const renderSortingButton = () => {
    if (!sortable) {
      return null;
    }

    const { sorting } = store;
    const icon =
      sortingIconsMapping[
        sorting.column === key && sorting.order ? sorting.order : "none"
      ];

    return (
      <span>
        <i
          className={`fa fa-${icon} ${iconStyles}`}
          onClick={() => sorting.toggleColumnSorting(key)}
        />
      </span>
    );
  };

  const renderFilterButton = () => {
    if (!filter) {
      return null;
    }

    return (
      <span>
        <i
          className={`fa fa-filter ${iconStyles}`}
          id={key}
          onClick={filter.toggleVisibility}
        />
        <Popover
          placement="bottom"
          isOpen={filter.isVisible}
          target={key}
          toggle={filter.toggleVisibility}
        >
          <PopoverBody>
            {filtersToComponentsMapping[filter.type](filter)}
          </PopoverBody>
        </Popover>
      </span>
    );
  };

  return (
    <div className="d-flex">
      {renderSortingButton()}
      <span {...headerTitleStyles}>{header}</span>
      {renderFilterButton()}
    </div>
  );
};

export default observer(ColumnHeader);
