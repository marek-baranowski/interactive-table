import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import { observer } from "mobx-react";
import { iconStyles, headerTitleStyles } from "./styles";
import { StringFilter, MultiSelectFilter } from "../Filters";
import RangeFilter from "../Filters/RangeFilter";
import { SORT_ORDER_TYPES, FILTER_TYPES } from "config";

const sortingIconsMapping = {
  [SORT_ORDER_TYPES.ASCENDING]: "sort-asc",
  [SORT_ORDER_TYPES.DESCENDING]: "sort-desc",
  none: "sort"
};

const SortingButton = observer(({ column: { key, sortable }, sorting }) => {
  if (!sortable) {
    return null;
  }

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
});

const FilterButton = observer(({ column: { key, filter } }) => {
  if (!filter) {
    return null;
  }

  const iconProps = {
    id: key,
    onClick: filter.toggleVisibility,
    className: `fa fa-filter ${iconStyles}${filter.isActive
      ? " text-primary"
      : ""}`
  };

  return (
    <span>
      <i {...iconProps} />
      <Popover
        placement="bottom"
        isOpen={filter.isVisible}
        target={key}
        toggle={filter.toggleVisibility}
      >
        <PopoverBody>
          {{
            [FILTER_TYPES.STRING_FILTER]: StringFilter,
            [FILTER_TYPES.MULTI_SELECT_FILTER]: MultiSelectFilter,
            [FILTER_TYPES.RANGE_FILTER]: filter => <RangeFilter {...{columnKey: key, filter}} />
          }[filter.type](filter)}
        </PopoverBody>
      </Popover>
    </span>
  );
});

export const ColumnHeader = ({ column, sorting }) => (
  <div className="d-flex">
    <SortingButton {...{ column, sorting }} />
    <span {...headerTitleStyles}>{column.header}</span>
    <FilterButton {...{ column }} />
  </div>
);

export default observer(ColumnHeader);
